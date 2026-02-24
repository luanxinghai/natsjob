package dotutil

import "strings"

type DotPath struct {
	s    string
	dots []int // 存储每个 '.' 的索引位置
}

// NewDotPath 构造器：O(n) 一次扫描，记录所有 . 位置
func NewDotPath(s string) *DotPath {
	if s == "" {
		return &DotPath{s: s}
	}

	// 预估 dots 容量（避免多次扩容）
	cap := strings.Count(s, ".")
	dots := make([]int, 0, cap)

	for i, ch := range s {
		if ch == '.' {
			dots = append(dots, i)
		}
	}

	return &DotPath{
		s:    s,
		dots: dots,
	}
}

// Part 获取第 i 段（0-based），返回空字符串表示越界
func (dp *DotPath) Part(i int) string {
	totalParts := len(dp.dots) + 1

	// 边界检查
	if i < 0 || i >= totalParts {
		return ""
	}

	var start, end int
	if i == 0 {
		start = 0
	} else {
		// 检查索引是否有效
		if i-1 >= len(dp.dots) {
			return ""
		}
		start = dp.dots[i-1] + 1
	}

	if i == totalParts-1 {
		end = len(dp.s)
	} else {
		// 检查索引是否有效
		if i >= len(dp.dots) {
			return ""
		}
		end = dp.dots[i]
	}

	return dp.s[start:end]
}

// Prefix 返回前 k 段组成的子串（k=3 → "abc.dd.ee"）
// 如果 k = 总段数，返回原串
func (dp *DotPath) Prefix(k int) string {
	totalParts := len(dp.dots) + 1

	// 边界检查
	if k <= 0 {
		return ""
	}
	if k >= totalParts {
		return dp.s
	}

	// 第 k 段结束的位置 = 第 k 个 '.' 的索引（即 dots[k-1]）
	// 因为 dots[0] 是第一个 '.'，对应第 1 段结束
	if k-1 >= len(dp.dots) {
		return dp.s // 防止越界
	}

	endIdx := dp.dots[k-1]
	return dp.s[:endIdx]
}

// Range 返回从第 start 段到第 end 段（包含）的子串
// 例如: "a.b.c.d.e" Range(1, 3) -> "b.c.d"
// start 和 end 都是 0-based 索引
func (dp *DotPath) Range(start, end int) string {
	totalParts := len(dp.dots) + 1

	// 边界检查
	if start < 0 || end < 0 || start > end || start >= totalParts {
		return ""
	}

	if end >= totalParts {
		end = totalParts - 1
	}

	var startPos, endPos int
	if start == 0 {
		startPos = 0
	} else {
		if start-1 >= len(dp.dots) {
			return ""
		}
		startPos = dp.dots[start-1] + 1
	}

	if end == totalParts-1 {
		endPos = len(dp.s)
	} else {
		if end >= len(dp.dots) {
			return ""
		}
		endPos = dp.dots[end]
	}

	return dp.s[startPos:endPos]
}

// NumParts 返回总段数
func (dp *DotPath) NumParts() int {
	return len(dp.dots) + 1
}

// HasPart 检查是否存在第 i 段
func (dp *DotPath) HasPart(i int) bool {
	return i >= 0 && i < dp.NumParts()
}

// String 返回原始字符串
func (dp *DotPath) String() string {
	return dp.s
}
