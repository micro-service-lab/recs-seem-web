// back 側
export const API_RESPONSE_TYPES = {
  Success: "000",
  System: "100",
  Validation: "200",
  Permission: "201",
  Unauthorized: "202",
  NotFound: "203",
  Unauthenticated: "204",
  PostTooLarge: "205",
  ThrottleRequests: "206",
  InvalidSignature: "207",
  StreamedResponse: "208",
  TokenMismatch: "209",
  MethodNotAllowed: "210",
  NotFoundModel: "211",
  TokenBlacklisted: "212",
  ModelConflict: "213",
  GuestGuard: "214",
  UserOnly: "215",
  ThrottleLoginRequests: "216",
  FailedUpload: "217",
  AuthNotFound: "218",
  RefreshTokenExpired: "219",
  AlreadyLogout: "220",
  SQLQueryError: "221",
  AlreadyNotExist: "222",
  NotMatchKey: "223",
  UnsupportedMediaType: "224",
  RequestFormatError: "225",
  AttemptOperatePersonalOrganization: "226",
  AttemptOperateWholeOrganization: "227",
  AttemptOperateGroupOrganization: "228",
  AttemptOperateGradeOrganization: "229",
  ConflictStorageKey: "230",
  NotFileOwner: "231",
  OnlyProfessorAction: "232",
  InvalidLoginIDOrPassword: "233",
  InvalidRefreshToken: "234",
  ExpireAccessToken: "235",
  ExpireRefreshToken: "236",
  CannotDeleteOrganizationChatRoom: "237",
  CannotDeletePrivateChatRoom: "238",
  CannotUpdatePrivateChatRoom: "239",
  CannotAddMemberToPrivateChatRoom: "240",
  CannotWithdrawMemberFromPrivateChatRoom: "241",
  CannotAddMemberToOrganizationChatRoom: "242",
  CannotWithdrawMemberFromOrganizationChatRoom: "243",
  CannotRemoveMemberFromOrganizationChatRoom: "244",
  CannotRemoveMemberFromPrivateChatRoom: "245",
  MultiPartFormParseError: "246",
  CannotDeleteSystemFile: "247",
  NotImageFile: "248",
  NotMessageOwner: "249",
  NotMatchChatRoomMessage: "250",
  CannotReadOwnMessage: "251",
  NotCreateMessageToSelf: "252",
  CannotAttachSystemFile: "253",
} as const;
