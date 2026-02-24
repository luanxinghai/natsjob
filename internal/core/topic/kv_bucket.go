package topic

type KVBucketStruct struct {
	JobKeys    string
	JobResults string
	Heartbeat  string
	ServerLB   string
	JobUpdate  string
}

var KV_BUCKET = KVBucketStruct{
	JobKeys:    "natsjob-job-keys",
	JobResults: "natsjob-job-results",
	Heartbeat:  "natsjob-heartbeat",
	ServerLB:   "natsjob-lb",
	JobUpdate:  "natsjob-job-update",
}
