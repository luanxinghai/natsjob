package main

import (
	"natsjob/internal/model"

	"gorm.io/gen"
)

func main() {
	g := gen.NewGenerator(gen.Config{
		OutPath:      "./internal/dao/query",
		ModelPkgPath: "./dao/model",
		Mode:         gen.WithDefaultQuery | gen.WithQueryInterface,
	})

	// 从现有结构体生成
	g.ApplyBasic(
		// 直接传入你的结构体实例
		&model.NjNamespace{},
		&model.NjApp{},
		&model.NjAppJob{},
		&model.NjAppJobParams{},
		&model.NjAppJobResult{},
		&model.NjAppJobSubResult{},
	)

	g.Execute()
}
