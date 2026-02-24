package enums

type JobConditionInfo struct {
	ClientFirst     string `json:"clientFirst" comment:"客户端最先注册"`
	ClientRandom    string `json:"clientRandom" comment:"客户端随机"`
	ClientRound     string `json:"clientRound" comment:"客户端轮询"`
	ClientMaxWeight string `json:"ClientMaxWeight" comment:"客户端最大权重"`
}

var JOB_CONDITION = JobConditionInfo{
	ClientFirst:     "clientFirst",
	ClientRandom:    "clientRandom",
	ClientRound:     "clientRound",
	ClientMaxWeight: "clientMaxWeight",
}
