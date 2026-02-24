package json

import (
	"testing"
)

type TestStruct struct {
	Name string `json:"name"`
	Age  int    `json:"age"`
}

func TestMarshal(t *testing.T) {
	s, err := Marshal(TestStruct{Name: "Alice", Age: 30})
	if err != nil {
		t.Fatal(err)
	}
	expect := `{"name":"Alice","age":30}`
	if s != expect {
		t.Errorf("got %s, want %s", s, expect)
	}
}

func TestMustMarshal2(t *testing.T) {
	s := MustMarshal(TestStruct{Name: "Alice", Age: 30})
	expect := `{"name":"Alice","age":30}`
	if s != expect {
		t.Errorf("got %s, want %s", s, expect)
	}
}

func TestPrettyMarshal(t *testing.T) {
	s, err := PrettyMarshal(TestStruct{Name: "Alice", Age: 30})
	if err != nil {
		t.Fatal(err)
	}
	expect := `{"name":"Alice","age":30}`
	if s != expect {
		t.Errorf("got %s, want %s", s, expect)
	}
}

func TestUnmarshal(t *testing.T) {
	var ts TestStruct
	err := Unmarshal(`{"name":"Bob","age":25}`, &ts)
	if err != nil {
		t.Fatal(err)
	}
	if ts.Name != "Bob" || ts.Age != 25 {
		t.Errorf("unmarshal failed: %+v", ts)
	}
}

func TestMustMarshal(t *testing.T) {
	defer func() {
		if recover() == nil {
			t.Error("expected panic on invalid input")
		}
	}()
	_ = MustMarshal(make(chan int)) // chan 不能序列化，会 panic
}
