package login

import (
	"crypto/aes"
	"crypto/cipher"
	"encoding/base64"
	"fmt"
)

// 定义固定的 key 和 iv（和前端保持一致）
const (
	encryptKey = "ANM408B24462AZYR"
	encryptIV  = "LYTNRU5666k4NWDD"
)

// pkcs7Padding 实现 PKCS7 填充（匹配 CryptoJS.pad.Pkcs7）
// 因为 AES 加密要求明文长度是块大小（16 字节）的整数倍，填充用于补足长度
func pkcs7Padding(data []byte, blockSize int) []byte {
	// 计算需要填充的字节数
	padding := blockSize - len(data)%blockSize
	// 构建填充内容：每个字节的值都是填充的长度
	paddingBytes := make([]byte, padding)
	for i := range paddingBytes {
		paddingBytes[i] = byte(padding)
	}
	// 拼接明文和填充内容
	return append(data, paddingBytes...)
}

// AesCbcEncrypt 实现和前端 crypto-js 一致的 AES-CBC 加密
func AesCbcEncrypt(plaintext string) (string, error) {
	// 1. 转换 key、iv、明文为字节数组（UTF-8 编码，和前端一致）
	keyBytes := []byte(encryptKey)
	ivBytes := []byte(encryptIV)
	plainBytes := []byte(plaintext)

	// 2. 验证 key 和 iv 长度（AES-128 要求 key 16 字节，CBC 模式要求 iv 16 字节）
	if len(keyBytes) != 16 || len(ivBytes) != 16 {
		return "", fmt.Errorf("key 和 iv 必须都是 16 字节长度")
	}

	// 3. 创建 AES 密码块
	block, err := aes.NewCipher(keyBytes)
	if err != nil {
		return "", fmt.Errorf("创建 AES 密码块失败：%v", err)
	}

	// 4. 对明文进行 PKCS7 填充
	paddedPlainBytes := pkcs7Padding(plainBytes, block.BlockSize())

	// 5. 初始化 CBC 模式的加密器
	blockMode := cipher.NewCBCEncrypter(block, ivBytes)

	// 6. 执行加密（密文存储空间和填充后的明文一致）
	cipherBytes := make([]byte, len(paddedPlainBytes))
	blockMode.CryptBlocks(cipherBytes, paddedPlainBytes)

	// 7. 转换密文为 Base64 字符串（和 crypto-js 输出格式一致）
	return base64.StdEncoding.EncodeToString(cipherBytes), nil
}
