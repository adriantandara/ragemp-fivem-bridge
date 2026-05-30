import { createUnkProxy } from "./_helpers.js";

export class GameRecordingNs {
  unk = createUnkProxy();

  startRecording(recordingType) { StartRecording(recordingType ?? 1); }
  stopRecordingAndSaveClip() { StopRecordingAndSaveClip(); }
  isRecordingActive() { return IsRecordingActive(); }
  startRecordingWithOptions(recordingType, p1, p2) { StartRecordingWithOptions(recordingType ?? 1, p1 ?? 0, p2 ?? 0); }
}
