package org.bigbluebutton.core.apps.webcam

import org.bigbluebutton.common2.msgs._
import org.bigbluebutton.core.apps.PermissionCheck
import org.bigbluebutton.core.bus.MessageBus
import org.bigbluebutton.core.models.Webcams
import org.bigbluebutton.core.running.LiveMeeting

trait CamBroadcastStoppedInSfuEvtMsgHdlr {
  this: WebcamApp2x =>

  def handle(
      msg:         CamBroadcastStoppedInSfuEvtMsg,
      liveMeeting: LiveMeeting,
      bus:         MessageBus
  ): Unit = {
    val meetingId = liveMeeting.props.meetingProp.intId
    val userId = msg.header.userId
    val streamId = msg.body.streamId

    CameraHdlrHelpers.stopBroadcastedCam(
      liveMeeting,
      meetingId,
      userId,
      streamId,
      bus.outGW
    )
  }
}
