package enums

import (
	"sync/atomic"

	"github.com/nats-io/nats.go"
)

type NatsClient struct {
	Nc                *nats.Conn
	Connected         atomic.Bool
	WatcherJobKeys    func(kvEntry nats.KeyValueEntry)
	WatcherJobResults func(kvEntry nats.KeyValueEntry)
	WatcherClientReg  func(kvEntry nats.KeyValueEntry)
	WatcherServerReg  func(kvEntry nats.KeyValueEntry)
	ConnectOK         func()
	Disconnect        func()
}
