const globalConst: any = {
    buildMode: {
      Develop: "develop",
      Beta: "beta",
      Production: "production"
    },

    genderTypeMap: {
        0: "Không xác định",
        1: "Nam",
        2: "Nữ"
    },

    statusContent: {       
        1: 'Draft',
        2: 'Phát hành',
        3: 'Ẩn',
        4: 'Hủy'        
      },

      orientationMode: {
        1: 'Auto',
        2: 'Ngang',
        3: 'Dọc'
      },

      RESPONSE_STATUS: {
        EXPIRED: 1005,
        EXCEEDED_LIMIT: 1010,
        INVALID_OAUTH_TOKEN: 4000,
        ALREADY_LINK_AUTH: 4001,
        USER_NOT_FOUND: 4002,
        INVALID_OTP: 4003,
        INVALID_PASSWORD: 4004,
        USER_EXCEED_SESSION_LIMIT: 4006,
        USER_CONFLICT: 4007,
        EXPIRED_OTP: 4012,
        EXCEEDED_ATTEMPT: 4014
      },

      PAYMENT_TYPE: {
        FREE: 1,
        PAY_BEFORE: 2,
        PAY_AFTER: 3
      },
  }

  export default globalConst