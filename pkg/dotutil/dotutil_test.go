package dotutil

import (
	"fmt"
	"testing"
)

func TestId(t *testing.T) {
	s := "natsjob.job.end.app.biz.owner.2009639777866878976"
	dp := NewDotPath(s)

	// 1. 获取每个部分
	fmt.Println("Part 0:", dp.Part(0))   // "abc"
	fmt.Println("Part 2:", dp.Part(2))   // "ee"
	fmt.Println("Part 5:", dp.Part(5))   // "hh"
	fmt.Println("Part 6:", dp.Part(6))   // "" (越界)
	fmt.Println("Part 77:", dp.Part(77)) // "" (越界)

	// 2. 获取前缀
	fmt.Println("Prefix(3):", dp.Prefix(3))   // "abc.dd.ee"
	fmt.Println("Prefix(1):", dp.Prefix(1))   // "abc"
	fmt.Println("Prefix(10):", dp.Prefix(10)) // "abc.dd.ee.ff.gg.hh"
	fmt.Println("Prefix(1):", dp.Prefix(4))
	// 3. 总段数
	fmt.Println("Total parts:", dp.NumParts()) // 6

	fmt.Println("Range(1):", dp.Range(0, 2))
	fmt.Println("Range(1):", dp.Range(1, 2))
	fmt.Println("Range(1):", dp.Range(0, 200))
	fmt.Println("Range(1):", dp.Range(3, 5))
	fmt.Println("Range(1):", dp.Part(5))
	fmt.Println("Range(1):", dp.Part(6))
}
