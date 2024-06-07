import { API_RESPONSE_TYPES } from './backend-response';

export const RESPONSE_LEVEL = {
  Logout: 0, // ログアウトを強制
  Transition: 1, // ログイン画面へ遷移
  RequestRefreshToken: 2, // リフレッシュトークンの再生成を要求
  Modal: 3, // モーダル
  Toast: 4, //トースト
  None: 5, //何もなし
} as const;

type MessageType = {
  [id: string]: {
    message: string;
    level: (typeof RESPONSE_LEVEL)[keyof typeof RESPONSE_LEVEL];
  };
};

export const API_RESPONSE_HANDLING: MessageType = {
  [API_RESPONSE_TYPES.Success]: {
    message: 'success-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.System]: {
    message: 'system-error-response',
    level: RESPONSE_LEVEL.Toast,
  },
  [API_RESPONSE_TYPES.Validation]: {
    message: 'validation-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.Permission]: {
    message: 'permission-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.Unauthorized]: {
    message: 'unauthorized-error-response',
    level: RESPONSE_LEVEL.Transition,
  },
  [API_RESPONSE_TYPES.NotFound]: {
    message: 'not-found-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.Unauthenticated]: {
    message: 'unauthenticated-error-response',
    level: RESPONSE_LEVEL.Transition,
  },
  [API_RESPONSE_TYPES.PostTooLarge]: {
    message: 'post-too-large-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.ThrottleRequests]: {
    message: 'throttle-requests-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.InvalidSignature]: {
    message: 'invalid-signature-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.StreamedResponse]: {
    message: 'streamed-response-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.TokenMismatch]: {
    message: 'token-mismatch-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.MethodNotAllowed]: {
    message: 'method-not-allowed-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.NotFoundModel]: {
    message: 'not-found-model-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.TokenBlacklisted]: {
    message: 'token-blacklisted-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.ModelConflict]: {
    message: 'model-conflict-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.GuestGuard]: {
    message: 'guest-guard-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.UserOnly]: {
    message: 'user-only-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.ThrottleLoginRequests]: {
    message: 'throttle-login-requests-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.FailedUpload]: {
    message: 'failed-upload-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.AuthNotFound]: {
    message: 'auth-not-found-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.RefreshTokenExpired]: {
    message: 'refresh-token-expired-error-response',
    level: RESPONSE_LEVEL.Transition,
  },
  [API_RESPONSE_TYPES.AlreadyLogout]: {
    message: 'already-logout-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.SQLQueryError]: {
    message: 'sql-query-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.AlreadyNotExist]: {
    message: 'already-not-exist-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.NotMatchKey]: {
    message: 'not-match-key-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.UnsupportedMediaType]: {
    message: 'unsupported-media-type-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.RequestFormatError]: {
    message: 'request-format-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.AttemptOperatePersonalOrganization]: {
    message: 'attempt-operate-personal-organization-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.AttemptOperateWholeOrganization]: {
    message: 'attempt-operate-whole-organization-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.AttemptOperateGroupOrganization]: {
    message: 'attempt-operate-group-organization-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.AttemptOperateGradeOrganization]: {
    message: 'attempt-operate-grade-organization-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.ConflictStorageKey]: {
    message: 'conflict-storage-key-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.NotFileOwner]: {
    message: 'not-file-owner-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.OnlyProfessorAction]: {
    message: 'only-professor-action-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.InvalidLoginIDOrPassword]: {
    message: 'invalid-login-id-or-password-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.InvalidRefreshToken]: {
    message: 'invalid-refresh-token-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.ExpireAccessToken]: {
    message: 'expire-access-token-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.ExpireRefreshToken]: {
    message: 'expire-refresh-token-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.CannotDeleteOrganizationChatRoom]: {
    message: 'cannot-delete-organization-chat-room-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.CannotDeletePrivateChatRoom]: {
    message: 'cannot-delete-private-chat-room-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.CannotUpdatePrivateChatRoom]: {
    message: 'cannot-update-private-chat-room-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.CannotAddMemberToPrivateChatRoom]: {
    message: 'cannot-add-member-to-private-chat-room-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.CannotWithdrawMemberFromPrivateChatRoom]: {
    message: 'cannot-withdraw-member-from-private-chat-room-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.CannotAddMemberToOrganizationChatRoom]: {
    message: 'cannot-add-member-to-organization-chat-room-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.CannotWithdrawMemberFromOrganizationChatRoom]: {
    message: 'cannot-withdraw-member-from-organization-chat-room-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.CannotRemoveMemberFromOrganizationChatRoom]: {
    message: 'cannot-remove-member-from-organization-chat-room-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.CannotRemoveMemberFromPrivateChatRoom]: {
    message: 'cannot-remove-member-from-private-chat-room-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.MultiPartFormParseError]: {
    message: 'multi-part-form-parse-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.CannotDeleteSystemFile]: {
    message: 'cannot-delete-system-file-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.NotImageFile]: {
    message: 'not-image-file-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.NotMessageOwner]: {
    message: 'not-message-owner-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.NotMatchChatRoomMessage]: {
    message: 'not-match-chat-room-message-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.CannotReadOwnMessage]: {
    message: 'cannot-read-own-message-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.NotCreateMessageToSelf]: {
    message: 'not-create-message-to-self-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.CannotAttachSystemFile]: {
    message: 'cannot-attach-system-file-error-response',
    level: RESPONSE_LEVEL.None,
  },
} as const;
