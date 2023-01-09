import { check } from 'meteor/check';
import sendExportedPresentationChatMsg from '/imports/api/presentations/server/handlers/sendExportedPresentationChatMsg';
import setPresentationExporting from '/imports/api/presentations/server/modifiers/setPresentationExporting';

export default function handlePresentationExport({ body }, meetingId) {
  check(body, Object);
  check(meetingId, String);

  const { fileURI, presId } = body;

  check(fileURI, String);
  check(presId, String);

  sendExportedPresentationChatMsg(meetingId, presId, fileURI);
  setPresentationExporting(meetingId, presId, { status: 'EXPORTED' });
}
