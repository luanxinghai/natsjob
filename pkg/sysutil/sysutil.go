package sysutil

import (
	"fmt"
	"natsjob/logger"
	"net"
	"os"
	"runtime"
	"time"

	"github.com/shirou/gopsutil/v3/cpu"
	"github.com/shirou/gopsutil/v3/mem"
	"github.com/shirou/gopsutil/v3/process"
	"go.uber.org/zap"
)

type SystemInfo struct {
	// 机器信息
	MachineHostname     string `json:"machineHostname"`
	MachineIP           string `json:"machineIp"`
	MachineOS           string `json:"machineOs"`
	MachineArchitecture string `json:"machineArchitecture"`
	// 机器整体CPU信息
	MachineCPUCores int    `json:"machineCpuCores"`
	MachineCPUUsage string `json:"machineCpuUsage"` // 百分比
	// 机器整体内存信息
	MachineMemoryTotal string `json:"machineMemoryTotal"` // 字节
	MachineMemoryUsed  string `json:"machineMemoryUsed"`  // 字节
	MachineMemoryFree  string `json:"machineMemoryFree"`  // 字节
	MachineMemoryUsage string `json:"machineMemoryUsage"` // 百分比
	// 当前程序信息
	ProcessPID  int32  `json:"processPid"`
	ProcessName string `json:"processName"`
	// 当前程序CPU信息
	ProcessCPUUsage string `json:"processCpuUsage"` // 百分比
	// 当前程序内存信息
	ProcessMemoryRSS  string `json:"processMemoryRss"`  // 常驻内存大小 (字节)
	ProcessMemoryVMS  string `json:"processMemoryVms"`  // 虚拟内存大小 (字节)
	ProcessMemorySwap string `json:"processMemorySwap"` // 交换内存大小 (字节)
}

func GetSystemInfo() *SystemInfo {
	info := &SystemInfo{}

	// 获取机器基本信息
	var err error
	info.MachineHostname, err = os.Hostname()
	if err != nil {
		logger.Error("get hostname fail", zap.Error(err))
		return info
	}

	info.MachineIP = GetLocalIP()
	info.MachineOS = runtime.GOOS
	info.MachineArchitecture = runtime.GOARCH

	// 获取机器CPU信息
	info.MachineCPUCores, _ = cpu.Counts(false)
	cpuPercent, err := cpu.Percent(time.Second, false)
	if err == nil && len(cpuPercent) > 0 {
		info.MachineCPUUsage = Percentage(cpuPercent[0])
	}

	// 获取机器内存信息
	virtualMemory, err := mem.VirtualMemory()
	if err == nil {
		info.MachineMemoryTotal = Byte2Human(virtualMemory.Total)
		info.MachineMemoryUsed = Byte2Human(virtualMemory.Used)
		info.MachineMemoryFree = Byte2Human(virtualMemory.Free)
		info.MachineMemoryUsage = Percentage(virtualMemory.UsedPercent)
	}

	// 获取当前进程信息
	currentProcess, err := process.NewProcess(int32(os.Getpid()))
	if err == nil {
		info.ProcessPID = currentProcess.Pid

		// 获取进程名
		name, err := currentProcess.Name()
		if err == nil {
			info.ProcessName = name
		}

		// 获取进程CPU使用率
		cpuPercent, err := currentProcess.CPUPercent()
		if err == nil {
			info.ProcessCPUUsage = Percentage(cpuPercent)
		}

		// 获取进程内存信息
		memoryInfo, err := currentProcess.MemoryInfo()
		if err == nil {
			info.ProcessMemoryRSS = Byte2Human(memoryInfo.RSS)
			info.ProcessMemoryVMS = Byte2Human(memoryInfo.VMS)
		}

		// 获取交换内存
		memoryPercent, err := currentProcess.MemoryPercent()
		if err == nil {
			info.ProcessMemorySwap = Byte2Human(uint64(memoryPercent))
		}
	}
	return info
}

// GetLocalIP 获取本地IP地址
func GetLocalIP() string {
	addrs, err := net.InterfaceAddrs()
	if err != nil {
		return ""
	}

	for _, address := range addrs {
		// 检查ip地址判断是否回环地址
		if ipnet, ok := address.(*net.IPNet); ok && !ipnet.IP.IsLoopback() {
			if ipnet.IP.To4() != nil {
				return ipnet.IP.String()
			}
		}
	}
	return ""
}

// GetOutboundIP 获取对外连接的IP地址
func GetOutboundIP() string {
	conn, err := net.Dial("udp", "8.8.8.8:80")
	if err != nil {
		return ""
	}
	defer conn.Close()

	localAddr := conn.LocalAddr().(*net.UDPAddr)
	return localAddr.IP.String()
}

// GetAllIPs 获取所有IP地址
func GetAllIPs() []string {
	var ips []string

	interfaces, err := net.Interfaces()
	if err != nil {
		return ips
	}

	for _, iface := range interfaces {
		// 跳过非活动接口和回环接口
		if iface.Flags&net.FlagUp == 0 || iface.Flags&net.FlagLoopback != 0 {
			continue
		}

		addrs, err := iface.Addrs()
		if err != nil {
			continue
		}

		for _, addr := range addrs {
			var ip net.IP
			switch v := addr.(type) {
			case *net.IPNet:
				ip = v.IP
			case *net.IPAddr:
				ip = v.IP
			}

			if ip == nil || ip.IsLoopback() {
				continue
			}

			ip = ip.To4()
			if ip == nil {
				continue // 不是IPv4地址
			}

			ips = append(ips, ip.String())
		}
	}

	return ips
}
func Byte2Human(b uint64) string {
	const (
		KB = 1024
		MB = KB * 1024
		GB = MB * 1024
	)
	switch {
	case b >= GB:
		return fmt.Sprintf("%.2fG", float64(b)/GB)
	case b >= MB:
		return fmt.Sprintf("%.2fM", float64(b)/MB)
	case b >= KB:
		return fmt.Sprintf("%.2fK", float64(b)/KB)
	default:
		return fmt.Sprintf("%dByte", b)
	}
}

func Percentage(f float64) string {
	return fmt.Sprintf("%.2f%%", f)
}
