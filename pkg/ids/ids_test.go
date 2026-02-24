package ids

import (
	"fmt"
	"testing"
)

func TestId(t *testing.T) {
	fmt.Println(Id())
	//fmt.Println(IdStr())
	//fmt.Println(IdBase64())
	//fmt.Println(IdBase2())
	fmt.Println(Id7DaysAgoMin())
	fmt.Println(IdAgoDayMin(1))
	fmt.Println("---------------")
	id := Id()
	fmt.Println(id - IdAgoHourMin(1))
	fmt.Println(id - IdAgoHourMin(24))
	fmt.Println(id - IdAgoHourMin(0))
	//fmt.Println(IdAgoDayMin(1) - IdAgoHourMin(24))

	//fmt.Println(id)
	//for i := range 10 {
	//	fmt.Println(id - IdAgoDayMin(i) + id - IdAgoDayMin(-i))
	//}
	fmt.Println("---------------")
	for i := range 10 {
		//fmt.Println(IdAgoDayMin(int64(i)) - IdAgoHourMin(int64(i*24)))
		fmt.Println(id - IdAgoHourMin(int64(1*i)))
	}
}
