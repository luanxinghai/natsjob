package com.natsjob.starter.interfaces;

import com.natsjob.starter.interfaces.common.OnNatsJobBasicHandler;


public interface NatsJobLoadHandler extends OnNatsJobBasicHandler {

    void onLoad();
}
