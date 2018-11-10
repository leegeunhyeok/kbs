/**

{
  hook: '',
  res: {
    message: {
      text: ''
    },
    keyboard: {
      type: '',
      buttons: [] 
    }
  }
}

*/

const config = require('config')


/* 메인 버튼 */
const mainButton = {
  type: 'buttons',
  buttons: [
    '◇ 뉴스 제보 + 주요 뉴스',
    '◇ 프로그램 + 다시보기',
    '◇ 아나운서 + 기상캐스터',
    '◇ On-Air 실시간 방송',
    '◇ KBS부산 소개 + 사보',
    '◇ 수신료 + 시청자권익센터',
    '◇ 부산홀 공연 + 문화 행사',
    '◇ 견학 + 광고',
    '◇ 부산 날씨 + 교통 + 관광지도',
    '♣ 직원용'
  ]
}
exports.main = mainButton


/* -- */
const endButton = {
  type: 'buttons',
  buttons: [
    '◇ 서비스 메뉴로 가기',
    '◇ 안내번호 통화하기',
    '◆ 처음으로'
  ]
}

const serverUrl = `${config.get('server')}:${config.get('port')}`
exports.serverUrl = serverUrl

/* 뉴스 응답 데이터 */
const newsRes = {
  message: {
    text: '[ 뉴스 ]를 원하시면, 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.',
    photo: {
      url: serverUrl + '/img/2.KBS뉴스.png',
      width: 640,
      height: 480
    }
  },
  keyboard: {
    type: 'buttons',
    buttons: [
      '◇ 뉴스광장',
      '◇ 뉴스930',
      '◇ 뉴스7 네트워크',
      '◇ 뉴스9',
      '◇ 주요뉴스',
      '◆ 처음으로'
    ]
  }
}


/* 알 수 없는 입력인 경우 보여줄 데이터 */
exports.fallback = {
  message: {
    text: '죄송합니다. 문의하신 내용에 대한 답변을 확인할 수 없습니다.\n\n' + 
          '다른 메뉴를 확인하시려면 아래의 버튼을 선택해주세요'
  },
  keyboard: endButton
}


/* 대화 데이터 */
exports.datas = [
  {
    hook: '◆ 처음으로',
    res: {
      message: {
        text: '감사합니다. 아래의 대화창에 궁금한 내용을 입력하시면, 문의사항에 답해 드리겠습니다.\n\n' +
              '◀예시▶뉴스,제보,프로그램,수신료,공연,광고,견학,아나운서,기상캐스터,날씨,교통,다시보기,실시간방송,처음으로 등'
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 서비스 메뉴로 가기',
    res: {
      message: {
        text: '아래의 대화창에 궁금한 내용을 입력하시면, 문의사항에 답해 드리겠습니다.\n\n' +
              '◀예시▶뉴스,제보,프로그램,수신료,공연,광고,견학,아나운서,기상캐스터,날씨,교통,다시보기,실시간방송,처음으로 등'
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 안내번호 통화하기',
    res: {
      message: {
        text: '상담원에게 안내를 받고 싶으시면 아래 번호로 연락해주세요\n\n051-620-7100'
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 뉴스 제보 + 주요 뉴스',
    res: {
      message: {
        text: '감사합니다. 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.'
      },
      keyboard: {
        type: 'buttons',
        buttons: [
          '◇ 뉴스 제보',
          '◇ 뉴스',
          '◆ 처음으로'
        ]
      }
    }
  },
  {
    hook: '◇ 뉴스 제보',
    res: {
      message: {
        text: '[ 뉴스제보 ]를 원하시면, 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.',
        photo: {
          url: serverUrl + '/img/1.KBS제보.png',
          width: 640,
          height: 480
        }
      },
      keyboard: {
        type: 'buttons',
        buttons: [
          '◇ 부산뉴스 제보',
          '◇ 본사뉴스 제보',
          '◆ 이전으로 (제보)'
        ]
      }
    }
  },
  {
    hook: '◆ 이전으로 (제보)',
    res: {
      message: {
        text: '[ 뉴스제보 ]를 원하시면, 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.',
        photo: {
          url: serverUrl + '/img/1.KBS제보.png',
          width: 640,
          height: 480
        }
      },
      keyboard: {
        type: 'buttons',
        buttons: [
          '◇ 부산뉴스 제보',
          '◇ 본사뉴스 제보',
          '◆ 이전으로 (제보)'
        ]
      }
    }
  },
  {
    hook: '◇ 부산뉴스 제보',
    res: {
      message: {
        text: 'https://bit.ly/2pQUuTT',
        message_button: {
          label: '부산뉴스 제보 바로가기',
          url: 'https://bit.ly/2pQUuTT'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 본사뉴스 제보',
    res: {
      message: {
        text: 'https://bit.ly/1OBewFL',
        message_button: {
          label: '본사뉴스 제보 바로가기',
          url: 'https://bit.ly/1OBewFL'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '뉴스',
    res: newsRes
  },
  {
    hook: '뉴스광장',
    res: newsRes
  },
  {
    hook: '뉴스930',
    res: newsRes
  },
  {
    hook: '뉴스7',
    res: newsRes
  },
  {
    hook: '뉴스9',
    res: newsRes
  },
  {
    hook: '◇ 뉴스',
    res: newsRes
  },
  {
    hook: '◇ 뉴스광장',
    res: {
      message: {
        text: 'https://bit.ly/2PsUS6b',
        message_button: {
          label: '뉴스광장 바로가기',
          url: 'https://bit.ly/2PsUS6b'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 뉴스930',
    res: {
      message: {
        text: 'https://bit.ly/2QGVqp6',
        message_button: {
          label: '뉴스광장 바로가기',
          url: 'https://bit.ly/2QGVqp6'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 뉴스7 네트워크',
    res: {
      message: {
        text: 'https://bit.ly/2QGfFDi',
        message_button: {
          label: '뉴스7 네트워크 바로가기',
          url: 'https://bit.ly/2QGfFDi'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 뉴스9',
    res: {
      message: {
        text: 'https://bit.ly/2REcFsu',
        message_button: {
          label: '뉴스9 바로가기',
          url: 'https://bit.ly/2REcFsu'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 주요뉴스',
    res: {
      message: {
        text: 'https://bit.ly/2A0aLvz',
        message_button: {
          label: '뉴스광장 바로가기',
          url: 'https://bit.ly/2A0aLvz'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 프로그램 + 다시보기',
    res: {
      message: {
        text: '[ 프로그램 ]을 원하시면, 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.',
        photo: {
          url: serverUrl + '/img/3.프로그램.png',
          width: 640,
          height: 480
        }
      },
      keyboard: {
        type: 'buttons',
        buttons: [
          '◇ TV 프로그램',
          '◇ Radio 프로그램',
          '◇ 본사 TV 프로그램 + 참여',
          '◆ 처음으로'
        ]
      }
    }
  },
  {
    hook: '◇ TV 프로그램',
    res: {
      message: {
        text: '감사합니다. 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.'
      },
      keyboard: {
        type: 'buttons',
        buttons: [
          '◇ K 토크',
          '◇ 아침마당',
          '◇ 생생투데이',
          '◇ 뮤직토크쇼 가요1번지',
          '◇ 무대와 객석',
          '◇ 전국을 달린다',
          '◇ 전국을 달린다 스페셜',
          '◇ KBS부산 스페셜',
          '◇ 열린채널 부산',
          '◆ 이전으로 (프로그램)'
        ]
      }
    }
  },
  {
    hook: '◆ 이전으로 (프로그램)',
    res: {
      message: {
        text: '감사합니다. 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.',
        photo: {
          url: serverUrl + '/img/3.프로그램.png',
          width: 640,
          height: 480
        }
      },
      keyboard: {
        type: 'buttons',
        buttons: [
          '◇ TV 프로그램',
          '◇ Radio 프로그램',
          '◇ 본사 TV 프로그램 + 참여',
          '◆ 처음으로'
        ]
      }
    }
  },
  {
    hook: '◇ K 토크',
    res: {
      message: {
        text: '◇ K 토크'
      },
      keyboard: {
        type: 'buttons',
        buttons: [
          '◇ K 토크 프로그램 정보',
          '◇ K 토크 방송내용',
          '◇ K 토크 다시보기',
          '◆ 이전으로 (프로그램)'
        ]
      }
    }
  },
  {
    hook: '◇ K 토크 프로그램 정보',
    res: {
      message: {
        text: '◇ K 토크 프로그램 정보 입니다.',
        message_button: {
          label: 'K 토크 정보',
          url: 'http://program.kbs.co.kr/1tv/local/ktalk'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ K 토크 방송내용',
    res: {
      message: {
        text: '◇ K 토크 방송내용 입니다.',
        message_button: {
          label: 'K 토크 방송내용',
          url: 'https://bit.ly/2OfPabd'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ K 토크 다시보기',
    res: {
      message: {
        text: '◇ K 토크 다시보기 입니다.',
        message_button: {
          label: 'K 토크 다시보기',
          url: 'https://bit.ly/2RMrlpm'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 아침마당',
    res: {
      message: {
        text: '◇ 아침마당'
      },
      keyboard: {
        type: 'buttons',
        buttons: [
          '◇ 아침마당 프로그램 정보',
          '◇ 아침마당 방송내용',
          '◇ 아침마당 다시보기',
          '◆ 이전으로 (프로그램)'
        ]
      }
    }
  },
  {
    hook: '◇ 아침마당 프로그램 정보',
    res: {
      message: {
        text: '◇ 아침마당 프로그램 정보 입니다.',
        message_button: {
          label: '아침마당 정보',
          url: 'http://program.kbs.co.kr/1tv/local/bsmorma'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 아침마당 방송내용',
    res: {
      message: {
        text: '◇ 아침마당 방송내용 입니다.',
        message_button: {
          label: '아침마당 방송내용',
          url: 'https://bit.ly/2IKw479'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 아침마당 다시보기',
    res: {
      message: {
        text: '◇ 아침마당 다시보기 입니다.',
        message_button: {
          label: '아침마당 다시보기',
          url: 'https://bit.ly/2yCogQ'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 생생투데이',
    res: {
      message: {
        text: '◇ 생생투데이'
      },
      keyboard: {
        type: 'buttons',
        buttons: [
          '◇ 생생투데이 프로그램 정보',
          '◇ 생생투데이 방송내용',
          '◇ 생생투데이 다시보기',
          '◆ 이전으로 (프로그램)'
        ]
      }
    }
  },
  {
    hook: '◇ 생생투데이 프로그램 정보',
    res: {
      message: {
        text: '◇ 생생투데이 프로그램 정보 입니다.',
        message_button: {
          label: '생생투데이 정보',
          url: 'http://program.kbs.co.kr/1tv/local/sstday'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 생생투데이 방송내용',
    res: {
      message: {
        text: '◇ 생생투데이 방송내용 입니다.',
        message_button: {
          label: '생생투데이 방송내용',
          url: 'https://bit.ly/2IQe3o5'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 생생투데이 다시보기',
    res: {
      message: {
        text: '◇ 생생투데이 다시보기 입니다.',
        message_button: {
          label: '생생투데이 다시보기',
          url: 'https://bit.ly/2EjNwRf'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 뮤직토크쇼 가요1번지',
    res: {
      message: {
        text: '◇ 뮤직토크쇼 가요1번지'
      },
      keyboard: {
        type: 'buttons',
        buttons: [
          '◇ 뮤직토크쇼 가요1번지 프로그램 정보',
          '◇ 뮤직토크쇼 가요1번지 방송내용',
          '◇ 뮤직토크쇼 가요1번지 다시보기',
          '◆ 이전으로 (프로그램)'
        ]
      }
    }
  },
  {
    hook: '◇ 뮤직토크쇼 가요1번지 프로그램 정보',
    res: {
      message: {
        text: '◇ 뮤직토크쇼 가요1번지 프로그램 정보 입니다.',
        message_button: {
          label: '뮤직토크쇼 가요1번지 정보',
          url: 'http://program.kbs.co.kr/1tv/local/gayo1'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 뮤직토크쇼 가요1번지 방송내용',
    res: {
      message: {
        text: '◇ 뮤직토크쇼 가요1번지 방송내용 입니다.',
        message_button: {
          label: '뮤직토크쇼 가요1번지 방송내용',
          url: 'https://bit.ly/2NsaN2N'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 뮤직토크쇼 가요1번지 다시보기',
    res: {
      message: {
        text: '◇ 뮤직토크쇼 가요1번지 다시보기 입니다.',
        message_button: {
          label: '뮤직토크쇼 가요1번지 다시보기',
          url: 'https://bit.ly/2NGoFqe'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 무대와 객석',
    res: {
      message: {
        text: '◇ 무대와 객석'
      },
      keyboard: {
        type: 'buttons',
        buttons: [
          '◇ 무대와 객석 프로그램 정보',
          '◇ 무대와 객석 방송내용',
          '◇ 무대와 객석 다시보기',
          '◆ 이전으로 (프로그램)'
        ]
      }
    }
  },
  {
    hook: '◇ 무대와 객석 프로그램 정보',
    res: {
      message: {
        text: '◇ 무대와 객석 프로그램 정보 입니다.',
        message_button: {
          label: '무대와 객석 정보',
          url: 'http://program.kbs.co.kr/1tv/local/stage'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 무대와 객석 방송내용',
    res: {
      message: {
        text: '◇ 무대와 객석 방송내용 입니다.',
        message_button: {
          label: '무대와 객석 방송내용',
          url: 'https://bit.ly/2QDFnZb'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 무대와 객석 다시보기',
    res: {
      message: {
        text: '◇ 무대와 객석 다시보기 입니다.',
        message_button: {
          label: '무대와 객석 다시보기',
          url: 'https://bit.ly/2RKwVZu'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 전국을 달린다',
    res: {
      message: {
        text: '◇ 전국을 달린다'
      },
      keyboard: {
        type: 'buttons',
        buttons: [
          '◇ 전국을 달린다 프로그램 정보',
          '◇ 전국을 달린다 방송내용',
          '◇ 전국을 달린다 다시보기',
          '◆ 이전으로 (프로그램)'
        ]
      }
    }
  },
  {
    hook: '◇ 전국을 달린다 프로그램 정보',
    res: {
      message: {
        text: '◇ 전국을 달린다 프로그램 정보 입니다.',
        message_button: {
          label: '전국을 달린다 정보',
          url: 'http://program.kbs.co.kr/1tv/local/jeonguk'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 전국을 달린다 방송내용',
    res: {
      message: {
        text: '◇ 전국을 달린다 방송내용 입니다.',
        message_button: {
          label: '전국을 달린다 방송내용',
          url: 'https://bit.ly/2pHOInk'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 전국을 달린다 다시보기',
    res: {
      message: {
        text: '◇ 전국을 달린다 다시보기 입니다.',
        message_button: {
          label: '전국을 달린다 다시보기',
          url: 'https://bit.ly/2IRFwFB'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 전국을 달린다 스페셜',
    res: {
      message: {
        text: '◇ 전국을 달린다 스페셜'
      },
      keyboard: {
        type: 'buttons',
        buttons: [
          '◇ 전국을 달린다 스페셜 프로그램 정보',
          '◇ 전국을 달린다 스페셜 방송내용',
          '◇ 전국을 달린다 스페셜 다시보기',
          '◆ 이전으로 (프로그램)'
        ]
      }
    }
  },
  {
    hook: '◇ 전국을 달린다 스페셜 프로그램 정보',
    res: {
      message: {
        text: '◇ 전국을 달린다 스페셜 프로그램 정보 입니다.',
        message_button: {
          label: '전국을 달린다 스페셜 정보',
          url: 'http://program.kbs.co.kr/1tv/local/special'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 전국을 달린다 스페셜 방송내용',
    res: {
      message: {
        text: '◇ 전국을 달린다 스페셜 방송내용 입니다. (없음)',
        message_button: {
          label: '전국을 달린다 스페셜 방송내용',
          url: 'https://bit.ly/2pHOInk'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 전국을 달린다 스페셜 다시보기',
    res: {
      message: {
        text: '◇ 전국을 달린다 스페셜 다시보기 입니다.',
        message_button: {
          label: '전국을 달린다 스페셜 다시보기',
          url: 'https://bit.ly/2OY6mRY'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ KBS부산 스페셜',
    res: {
      message: {
        text: '◇ KBS부산 스페셜'
      },
      keyboard: {
        type: 'buttons',
        buttons: [
          '◇ KBS부산 스페셜 프로그램 정보',
          '◇ KBS부산 스페셜 방송내용',
          '◇ KBS부산 스페셜 다시보기',
          '◆ 이전으로 (프로그램)'
        ]
      }
    }
  },
  {
    hook: '◇ KBS부산 스페셜 프로그램 정보',
    res: {
      message: {
        text: '◇ KBS부산 스페셜 프로그램 정보 입니다.',
        message_button: {
          label: 'KBS부산 스페셜 정보',
          url: 'http://program.kbs.co.kr/1tv/local/invbs'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ KBS부산 스페셜 방송내용',
    res: {
      message: {
        text: '◇ KBS부산 스페셜 방송내용 입니다. (없음)',
        message_button: {
          label: 'KBS부산 스페셜 방송내용',
          url: 'https://bit.ly/2OYiOkA'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ KBS부산 스페셜 다시보기',
    res: {
      message: {
        text: '◇ KBS부산 스페셜 다시보기 입니다.',
        message_button: {
          label: 'KBS부산 스페셜 다시보기',
          url: 'https://bit.ly/2QN8Lw2'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 열린채널',
    res: {
      message: {
        text: '◇ 열린채널'
      },
      keyboard: {
        type: 'buttons',
        buttons: [
          '◇ 열린채널 프로그램 정보',
          '◇ 열린채널 방송내용',
          '◇ 열린채널 다시보기',
          '◆ 이전으로 (프로그램)'
        ]
      }
    }
  },
  {
    hook: '◇ 열린채널 프로그램 정보',
    res: {
      message: {
        text: '◇ 열린채널 프로그램 정보 입니다.',
        message_button: {
          label: '열린채널 정보',
          url: 'http://program.kbs.co.kr/1tv/local/opnchbs'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 열린채널 방송내용',
    res: {
      message: {
        text: '◇ 열린채널 방송내용 입니다. (없음)',
        message_button: {
          label: '열린채널 방송내용',
          url: 'https://bit.ly/2C59uVn'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 열린채널 다시보기',
    res: {
      message: {
        text: '◇ 열린채널 다시보기 입니다. (없음)',
        message_button: {
          label: '열린채널 다시보기',
          url: 'https://bit.ly/2QN8Lw2'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ Radio 프로그램',
    res: {
      message: {
        text: '감사합니다. 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.'
      },
      keyboard: {
        type: 'buttons',
        buttons: [
          '◇ 굿모닝 부산',
          '◇ 라디오 정보센터',
          '◇ 뮤직데이트',
          '◇ 부산은 지금',
          '◇ 즐거운 저녁길',
          '★ 라디오 주파수 안내',
          '◆ 이전으로 (프로그램)'
        ]
      }
    }
  },
  {
    hook: '◇ 굿모닝 부산',
    res: {
      message: {
        text: '◇ 굿모닝 부산'
      },
      keyboard: {
        type: 'buttons',
        buttons: [
          '◇ 굿모닝 부산 프로그램 정보',
          '◇ 굿모닝 부산 방송내용',
          '◆ 이전으로 (프로그램)'
        ]
      }
    }
  },
  {
    hook: '◇ 굿모닝 부산 프로그램 정보',
    res: {
      message: {
        text: '◇ 굿모닝 부산 프로그램 정보 입니다.',
        message_button: {
          label: '굿모닝 부산 정보',
          url: 'https://bit.ly/2ISGn9j'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 굿모닝 부산 방송내용',
    res: {
      message: {
        text: '◇ 굿모닝 부산 방송내용 입니다.',
        message_button: {
          label: '굿모닝 부산 방송내용',
          url: 'https://bit.ly/2IKw479'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 라디오 정보센터',
    res: {
      message: {
        text: '◇ 라디오 정보센터'
      },
      keyboard: {
        type: 'buttons',
        buttons: [
          '◇ 라디오 정보센터 프로그램 정보',
          '◇ 라디오 정보센터 방송내용',
          '◆ 이전으로 (프로그램)'
        ]
      }
    }
  },
  {
    hook: '◇ 라디오 정보센터 프로그램 정보',
    res: {
      message: {
        text: '◇ 라디오 정보센터 프로그램 정보 입니다.',
        message_button: {
          label: '라디오 정보센터 정보',
          url: 'https://bit.ly/2NEZHaO'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 라디오 정보센터 방송내용',
    res: {
      message: {
        text: '◇ 라디오 정보센터 방송내용 입니다.',
        message_button: {
          label: '라디오 정보센터 방송내용',
          url: 'https://bit.ly/2RMhvUv'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 뮤직데이트',
    res: {
      message: {
        text: '◇ 뮤직데이트'
      },
      keyboard: {
        type: 'buttons',
        buttons: [
          '◇ 뮤직데이트 프로그램 정보',
          '◇ 뮤직데이트 선곡표',
          '◇ 뮤직데이트 문자 참여',
          '◆ 이전으로 (프로그램)'
        ]
      }
    }
  },
  {
    hook: '◇ 뮤직데이트 프로그램 정보',
    res: {
      message: {
        text: '◇ 뮤직데이트 프로그램 정보 입니다.',
        message_button: {
          label: '뮤직데이트 정보',
          url: 'https://bit.ly/2RK6HGt'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 뮤직데이트 선곡표',
    res: {
      message: {
        text: '◇ 뮤직데이트 선곡표 입니다.',
        message_button: {
          label: '뮤직데이트 선곡표',
          url: 'https://bit.ly/2pSscsa'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 뮤직데이트 문자참여',
    res: {
      message: {
        text: '◇ 뮤직데이트 문자참여 입니다.',
        message_button: {
          label: '뮤직데이트 문자참여',
          url: 'https://bit.ly/2DIyUKV'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 부산은 지금',
    res: {
      message: {
        text: '◇ 부산은 지금'
      },
      keyboard: {
        type: 'buttons',
        buttons: [
          '◇ 부산은 지금 프로그램 정보',
          '◇ 부산은 지금 방송내용',
          '◇ 부산은 지금 문자 참여',
          '◆ 이전으로 (프로그램)'
        ]
      }
    }
  },
  {
    hook: '◇ 부산은 지금 프로그램 정보',
    res: {
      message: {
        text: '◇ 부산은 지금 프로그램 정보 입니다.',
        message_button: {
          label: '부산은 지금 정보',
          url: 'https://bit.ly/2RNhT5p'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 부산은 지금 방송내용',
    res: {
      message: {
        text: '◇ 부산은 지금 방송내용 입니다.',
        message_button: {
          label: '부산은 지금 방송내용',
          url: 'https://bit.ly/2OTQyQ9'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 부산은 지금 문자 참여',
    res: {
      message: {
        text: '◇ 부산은 지금 문자 참여 입니다.',
        message_button: {
          label: '부산은 지금 문자 참여',
          url: 'https://bit.ly/2A82HJ7'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 즐거운 저녁길',
    res: {
      message: {
        text: '◇ 즐거운 저녁길'
      },
      keyboard: {
        type: 'buttons',
        buttons: [
          '◇ 즐거운 저녁길 프로그램 정보',
          '◇ 즐거운 저녁길 선곡표',
          '◇ 즐거운 저녁길 문자 참여',
          '◆ 이전으로 (프로그램)'
        ]
      }
    }
  },
  {
    hook: '◇ 즐거운 저녁길 프로그램 정보',
    res: {
      message: {
        text: '◇ 즐거운 저녁길 프로그램 정보 입니다.',
        message_button: {
          label: '즐거운 저녁길 정보',
          url: 'https://bit.ly/2RKEJKM'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 즐거운 저녁길 선곡표',
    res: {
      message: {
        text: '◇ 즐거운 저녁길 선곡표 입니다.',
        message_button: {
          label: '즐거운 저녁길 선곡표',
          url: 'https://bit.ly/2Ch3GYO'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 즐거운 저녁길 문자 참여',
    res: {
      message: {
        text: '◇ 즐거운 저녁길 문자 참여 입니다.',
        message_button: {
          label: '즐거운 저녁길 문자 참여',
          url: 'https://bit.ly/2Er1Zeq'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '★ 라디오 주파수',
    res: {
      message: {
        text: '▷ 1라디오: 103.7 MHz  ( AM 891KHz )\n\n\n2라디오: 97.1 MHz\n\n\n음악FM: 92.7 MHz'
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 본사 TV 프로그램 + 참여',
    res: {
      message: {
        text: '감사합니다. 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.'
      },
      keyboard: {
        type: 'buttons',
        buttons: [
          '★ 생방송 아침이 좋다',
          '★ 아침마당',
          '★ 무엇이든 물어보세요',
          '★ 6시 내고향',
          '★ 2TV 생생정보',
          '◆ 이전으로 (프로그램)'
        ]
      }
    }
  },
  {
    hook: '★ 생방송 아침이 좋다',
    res: {
      message: {
        text: '★ 생방송 아침이 좋다'
      },
      keyboard: {
        type: 'buttons',
        buttons: [
          '★ 생방송 아침이 좋다 프로그램 정보',
          '★ 생방송 아침이 좋다 방송내용',
          '★ 생방송 아침이 좋다 제보하기',
          '◆ 이전으로 (프로그램)'
        ]
      }
    }
  },
  {
    hook: '★ 생방송 아침이 좋다 프로그램 정보',
    res: {
      message: {
        text: '★ 생방송 아침이 좋다 프로그램 정보 입니다.',
        message_button: {
          label: '생방송 아침이 좋다 정보',
          url: 'https://bit.ly/2CcHoYo'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '★ 생방송 아침이 좋다 방송내용',
    res: {
      message: {
        text: '★ 생방송 아침이 좋다 방송내용 입니다.',
        message_button: {
          label: '생방송 아침이 좋다 방송내용',
          url: 'https://bit.ly/2A8gBe9'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '★ 생방송 아침이 좋다 제보하기',
    res: {
      message: {
        text: '★ 생방송 아침이 좋다 제보하기 입니다.',
        message_button: {
          label: '생방송 아침이 좋다 제보하기',
          url: 'https://bit.ly/2ygdD5Y'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '★ 아침마당',
    res: {
      message: {
        text: '★ 아침마당'
      },
      keyboard: {
        type: 'buttons',
        buttons: [
          '★ 아침마당 프로그램 정보',
          '★ 아침마당 방송내용',
          '★ 아침마당 티벗 투표하기',
          '◆ 이전으로 (프로그램)'
        ]
      }
    }
  },
  {
    hook: '★ 아침마당 프로그램 정보',
    res: {
      message: {
        text: '★ 아침마당 프로그램 정보 입니다.',
        message_button: {
          label: '아침마당 정보',
          url: 'https://bit.ly/2RO4E4u'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '★ 아침마당 방송내용',
    res: {
      message: {
        text: '★ 아침마당 방송내용 입니다.',
        message_button: {
          label: '아침마당 방송내용',
          url: 'https://bit.ly/2CfEMZW'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '★ 아침마당 티벗 투표하기',
    res: {
      message: {
        text: '★ 아침마당 티벗 투표하기 입니다.',
        message_button: {
          label: '아침마당 티벗 투표하기',
          url: 'https://bit.ly/2pQRRkN'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '★ 무엇이든 물어보세요',
    res: {
      message: {
        text: '★ 무엇이든 물어보세요'
      },
      keyboard: {
        type: 'buttons',
        buttons: [
          '★ 무엇이든 물어보세요 프로그램 정보',
          '★ 무엇이든 물어보세요 방송내용',
          '★ 무엇이든 물어보세요 티벗 투표하기',
          '◆ 이전으로 (프로그램)'
        ]
      }
    }
  },
  {
    hook: '★ 무엇이든 물어보세요 프로그램 정보',
    res: {
      message: {
        text: '★ 무엇이든 물어보세요 프로그램 정보 입니다.',
        message_button: {
          label: '무엇이든 물어보세요 정보',
          url: 'https://bit.ly/2A7IV0g'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '★ 무엇이든 물어보세요 방송내용',
    res: {
      message: {
        text: '★ 무엇이든 물어보세요 방송내용 입니다.',
        message_button: {
          label: '무엇이든 물어보세요 방송내용',
          url: 'https://bit.ly/2RNpTD9'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '★ 무엇이든 물어보세요 제보하기',
    res: {
      message: {
        text: '★ 무엇이든 물어보세요 제보하기 입니다.',
        message_button: {
          label: '무엇이든 물어보세요 제보하기',
          url: 'https://bit.ly/2pP73yK'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '★ 6시 내고향',
    res: {
      message: {
        text: '★ 6시 내고향'
      },
      keyboard: {
        type: 'buttons',
        buttons: [
          '★ 6시 내고향 프로그램 정보',
          '★ 6시 내고향 방송내용',
          '★ 6시 내고향 제보하기',
          '◆ 이전으로 (프로그램)'
        ]
      }
    }
  },
  {
    hook: '★ 6시 내고향 프로그램 정보',
    res: {
      message: {
        text: '★ 6시 내고향 프로그램 정보 입니다.',
        message_button: {
          label: '6시 내고향 정보',
          url: 'https://bit.ly/2yE5szM'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '★ 6시 내고향 방송내용',
    res: {
      message: {
        text: '★ 6시 내고향 방송내용 입니다.',
        message_button: {
          label: '6시 내고향 방송내용',
          url: 'https://bit.ly/2A88ajf'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '★ 6시 내고향 제보하기',
    res: {
      message: {
        text: '★ 6시 내고향 제보하기 입니다.',
        message_button: {
          label: '6시 내고향 제보하기',
          url: 'https://bit.ly/2NDR9Rp'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '★ 2TV 생생정보',
    res: {
      message: {
        text: '★ 2TV 생생정보'
      },
      keyboard: {
        type: 'buttons',
        buttons: [
          '★ 2TV 생생정보 프로그램 정보',
          '★ 2TV 생생정보 방송내용',
          '★ 2TV 생생정보 제보하기',
          '◆ 이전으로 (프로그램)'
        ]
      }
    }
  },
  {
    hook: '★ 2TV 생생정보 프로그램 정보',
    res: {
      message: {
        text: '★ 2TV 생생정보 프로그램 정보 입니다.',
        message_button: {
          label: '2TV 생생정보 정보',
          url: 'https://bit.ly/2QQCtAB'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '★ 2TV 생생정보 방송내용',
    res: {
      message: {
        text: '★ 2TV 생생정보 방송내용 입니다.',
        message_button: {
          label: '2TV 생생정보 방송내용',
          url: 'https://bit.ly/2QQDGYF'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '★ 2TV 생생정보 제보하기',
    res: {
      message: {
        text: '★ 2TV 생생정보 제보하기 입니다.',
        message_button: {
          label: '2TV 생생정보 제보하기',
          url: 'https://bit.ly/2PykO08'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 아나운서 + 기상캐스터',
    res: {
      message: {
        text: '감사합니다. 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.'
      },
      keyboard: {
        type: 'buttons',
        buttons: [
          '◇ 아나운서',
          '◇ 기상캐스터',
          '◆ 처음으로'
        ]
      }
    }
  },
  {
    hook: '◆ 이전으로 (아나운서 & 기상캐스터)',
    res: {
      message: {
        text: '감사합니다. 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.'
      },
      keyboard: {
        type: 'buttons',
        buttons: [
          '◇ 아나운서',
          '◇ 기상캐스터',
          '◆ 처음으로'
        ]
      }
    }
  },
  {
    hook: '◇ 아나운서',
    res: {
      message: {
        text: '[ 아나운서 프로필 ]을 원하시면, 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.',
        photo: {
          url: serverUrl + '/img/4.아나운서.png',
          width: 640,
          height: 480
        }
      },
      keyboard: {
        type: 'buttons',
        buttons: [
          '◇ 김평래 아나운서',
          '◇ 차경애 아나운서',
          '◇ 장현순 아나운서',
          '◇ 김동환 아나운서',
          '◇ 차재환 아나운서',
          '◇ 이지현 아나운서',
          '◇ 최현호 아나운서',
          '★ KBS본사 아나운서',
          '◆ 이전으로 (아나운서 & 기상캐스터)'
        ]
      }
    }
  },
  {
    hook: '◇ 김평래 아나운서',
    res: {
      message: {
        text: '◇ 김평래 아나운서 프로필 입니다.',
        message_button: {
          label: '◇ 김평래 아나운서',
          url: 'https://bit.ly/2N9XsvO'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 차경애 아나운서',
    res: {
      message: {
        text: '◇ 차경애 아나운서 프로필 입니다.',
        message_button: {
          label: '◇ 차경애 아나운서',
          url: 'https://bit.ly/2DJwrjl'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 장현순 아나운서',
    res: {
      message: {
        text: '◇ 장현순 아나운서 프로필 입니다.',
        message_button: {
          label: '◇ 장현순 아나운서',
          url: 'https://bit.ly/2NOqOoJ'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 김동환 아나운서',
    res: {
      message: {
        text: '◇ 김동환 아나운서 프로필 입니다.',
        message_button: {
          label: '◇ 김동환 아나운서',
          url: 'https://bit.ly/2zG39Ox'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 차재환 아나운서',
    res: {
      message: {
        text: '◇ 차재환 아나운서 프로필 입니다.',
        message_button: {
          label: '◇ 차재환 아나운서',
          url: 'https://bit.ly/2xMJhbl'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 이지현 아나운서',
    res: {
      message: {
        text: '◇ 이지현 아나운서 프로필 입니다.',
        message_button: {
          label: '◇ 이지현 아나운서',
          url: 'https://bit.ly/2OZHJ4e'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 최현호 아나운서',
    res: {
      message: {
        text: '◇ 최현호 아나운서 프로필 입니다.',
        message_button: {
          label: '◇ 최현호 아나운서',
          url: 'https://bit.ly/2QlVx9z'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '★ KBS본사 아나운서',
    res: {
      message: {
        text: '★ KBS본사 아나운서 프로필 정보입니다.',
        message_button: {
          label: '★ KBS본사 아나운서',
          url: 'https://bit.ly/2zGalug'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 기상캐스터',
    res: {
      message: {
        text: '[ 기상캐스터 프로필 ]을 원하시면, 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.',
        photo: {
          url: serverUrl + '/img/5.기상캐스터.png',
          width: 640,
          height: 480
        }
      },
      keyboard: {
        type: 'buttons',
        buttons: [
          '◇ 홍나실 기상캐스터',
          '★ KBS본사  기상캐스터',
          '◆ 이전으로 (아나운서 & 기상캐스터)'
        ]
      }
    }
  },
  {
    hook: '◇ 홍나실 기상캐스터',
    res: {
      message: {
        text: '◇ 홍나실 기상캐스터 프로필 입니다.',
        message_button: {
          label: '◇ 홍나실 기상캐스터',
          url: 'https://bit.ly/2Ebq093'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '★ KBS본사 기상캐스터',
    res: {
      message: {
        text: '★ KBS본사 기상캐스터 프로필 정보입니다.',
        message_button: {
          label: '★ KBS본사 기상캐스터',
          url: 'https://bit.ly/2CBHUjG'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ On-Air 실시간 방송',
    res: {
      message: {
        text: '[ 실시간방송 ]을 원하시면, 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.',
        photo: {
          url: serverUrl + '/img/6.실시간방송.png',
          width: 640,
          height: 480
        }
      },
      keyboard: {
        type: 'buttons',
        buttons: [
          '◇ TV 실시간 방송',
          '◇ Radio 실시간 방송',
          '◇ 기타',
          '◆ 처음으로'
        ]
      }
    }
  },
  {
    hook: '◆ 이전으로 (실시간방송)',
    res: {
      message: {
        text: '감사합니다. 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.',
        photo: {
          url: serverUrl + '/img/6.실시간방송.png',
          width: 640,
          height: 480
        }
      },
      keyboard: {
        type: 'buttons',
        buttons: [
          '◇ TV 실시간 방송',
          '◇ Radio 실시간 방송',
          '◇ 기타 실시간 방송',
          '◆ 처음으로'
        ]
      }
    }
  },
  {
    hook: '◇ TV 실시간 방송',
    res: {
      message: {
        text: '감사합니다. 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.'
      },
      keyboard: {
        type: 'buttons',
        buttons: [
          '◇ 1TV',
          '◇ 2TV',
          '◆ 이전으로 (실시간방송)'
        ]
      }
    }
  },
  {
    hook: '◇ 1TV',
    res: {
      message: {
        text: '◇ 1TV',
        message_button: {
          label: '◇ 1TV',
          url: 'https://bit.ly/2zGSRhf'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 2TV',
    res: {
      message: {
        text: '◇ 2TV',
        message_button: {
          label: '◇ 2TV',
          url: 'https://bit.ly/2zGSRhf'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ Radio 실시간 방송',
    res: {
      message: {
        text: '감사합니다. 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.'
      },
      keyboard: {
        type: 'buttons',
        buttons: [
          '◇ 1 Radio',
          '◇ 2 Radio',
          '◆ 이전으로 (실시간방송)'
        ]
      }
    }
  },
  {
    hook: '◇ 1 Radio',
    res: {
      message: {
        text: '◇ 1 Radio',
        message_button: {
          label: '◇ 1 Radio',
          url: 'https://bit.ly/2DIQwGr'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 2 Radio',
    res: {
      message: {
        text: '◇ 2 Radio',
        message_button: {
          label: '◇ 2 Radio',
          url: 'https://bit.ly/2NOkhdA'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 기타 실시간 방송',
    res: {
      message: {
        text: '감사합니다. 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.'
      },
      keyboard: {
        type: 'buttons',
        buttons: [
          '◇ 독도 실시간방송',
          '◇ KBS24 News',
          '◇ Facebook KBS',
          '◇ Utube KBS',
          '◆ 이전으로 (실시간방송)'
        ]
      }
    }
  },
  {
    hook: '◇ 독도 실시간방송',
    res: {
      message: {
        text: '◇ 독도 실시간방송',
        message_button: {
          label: '◇ 독도 실시간방송',
          url: 'https://bit.ly/2A7SHPW'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ KBS24 News',
    res: {
      message: {
        text: '◇ KBS24 News',
        message_button: {
          label: '◇ KBS24 News',
          url: 'https://bit.ly/2IYHZyp'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ Facebook KBS',
    res: {
      message: {
        text: '◇ Facebook KBS',
        message_button: {
          label: '◇ Facebook KBS',
          url: 'https://bit.ly/2EjsnXv'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ Utube KBS',
    res: {
      message: {
        text: '감사합니다. 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.'
      },
      keyboard: {
        type: 'buttons',
        buttons: [
          '◇ 1TV Utube',
          '◇ KBS부산 보이는 라디오 Utube',
          '◇ KBS부산 광안대교 Utube',
          '◆ 이전으로 (실시간방송)'
        ]
      }
    }
  },
  {
    hook: '◇ 1TV Utube',
    res: {
      message: {
        text: '◇ 1TV Utube',
        message_button: {
          label: '◇ 1TV Utube',
          url: 'https://youtu.be/8gdpcZ3Eu_8'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ KBS부산 보이는 라디오 Ubute',
    res: {
      message: {
        text: '◇ KBS부산 보이는 라디오 Ubute',
        message_button: {
          label: '◇ KBS부산 보이는 라디오 Ubute',
          url: 'https://youtu.be/laNWI16ZSMk'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ KBS부산 광안대교 Utube',
    res: {
      message: {
        text: '◇ KBS부산 광안대교 Utube',
        message_button: {
          label: '◇ KBS부산 광안대교 Utube',
          url: 'https://youtu.be/FvupG6eZLII'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ KBS부산 소개 + 사보',
    res: {
      message: {
        text: '[ KBS부산 안내 ]를 원하시면, 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.',
        photo: {
          url: serverUrl + '/img/7.KBS부산.png',
          width: 640,
          height: 480
        }
      },
      keyboard: {
        type: 'buttons',
        buttons: [
          '◇ KBS부산 소개',
          '◇ KBS부산 연락처',
          '◇ KBS사보',
          '◆ 처음으로'
        ]
      }
    }
  },
  {
    hook: '◇ KBS부산 소개',
    res: {
      message: {
        text: '◇ KBS부산 소개',
        message_button: {
          label: '◇ KBS부산 소개',
          url: 'http://busan.kbs.co.kr/index.html?sname=localmain'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ KBS부산 연락처',
    res: {
      message: {
        text: '◇ KBS부산 연락처',
        photo: {
          url: serverUrl + '/img/조직 및 부산 연락처.png',
          width: 480,
          height: 640
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ KBS사보',
    res: {
      message: {
        text: '◇ KBS사보',
        message_button: {
          label: '◇ KBS사보',
          url: 'http://mylovekbs.kbs.co.kr/newsletter'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 수신료 + 시청자권익센터',
    res: {
      message: {
        text: '감사합니다. 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.'
      },
      keyboard: {
        type: 'buttons',
        buttons: [
          '◇ 수신료',
          '◇ 시청자권익센터',
          '◆ 처음으로'
        ]
      }
    }
  },
  {
    hook: '◆ 이전으로 (수신료 & 시청자권익센터)',
    res: {
      message: {
        text: '감사합니다. 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.'
      },
      keyboard: {
        type: 'buttons',
        buttons: [
          '◇ 수신료',
          '◇ 시청자권익센터',
          '◆ 처음으로'
        ]
      }
    }
  },
  {
    hook: '◇ 수신료',
    res: {
      message: {
        text: '감사합니다. 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.'
      },
      keyboard: {
        type: 'buttons',
        buttons: [
          '◇ 공영방송과 수신료',
          '◇ 우리나라 수신료 제도',
          '◇ 외국의 수신료 제도',
          '◇ 수신료는 왜 받는건가요?',
          '◇ 수신료는 어디에 쓰이나요?',
          '◇ 수신료/난시청 민원 상담 콜센터 (1588-1801)',
          '◇ 기타',
          '◆ 이전으로 (수신료 & 시청자권익센터)'
        ]
      }
    }
  },
  {
    hook: '◇ 공영방송과 수신료',
    res: {
      message: {
        text: '◇ 공영방송과 수신료',
        message_button: {
          label: '◇ 공영방송과 수신료',
          url: 'https://bit.ly/2Rd6qvn'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 우리나라 수신료 제도',
    res: {
      message: {
        text: '◇ 우리나라 수신료 제도',
        message_button: {
          label: '◇ 우리나라 수신료 제도',
          url: 'https://bit.ly/2P0LMNQ'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 외국의 수신료 제도',
    res: {
      message: {
        text: '◇ 외국의 수신료 제도',
        message_button: {
          label: '◇ 외국의 수신료 제도',
          url: 'https://bit.ly/2Otn2jY'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 수신료는 왜 받는건가요?',
    res: {
      message: {
        text: '◇ 수신료는 왜 받는건가요?',
        message_button: {
          label: '◇ 수신료는 왜 받는건가요?',
          url: 'https://bit.ly/2RaqKNY'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 수신료는 어디에 쓰이나요?',
    res: {
      message: {
        text: '◇ 수신료는 어디에 쓰이나요?',
        message_button: {
          label: '◇ 수신료는 어디에 쓰이나요?',
          url: 'https://bit.ly/2NVzvhf'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 수신료/난시청 민원 상담 콜센터 (1588-1801)',
    res: {
      message: {
        text: '◇ 수신료/난시청 민원 상담 콜센터 (1588-1801)',
        message_button: {
          label: '◇ 수신료/난시청 민원 상담 콜센터 (1588-1801)',
          url: 'https://bit.ly/2OZSxiL'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 기타',
    res: {
      message: {
        text: '◇ 기타',
        message_button: {
          label: '◇ 기타',
          url: 'http://office.kbs.co.kr/susin'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 시청자권익센터',
    res: {
      message: {
        text: '◇ 시청자권익센터',
        message_button: {
          label: '◇ 시청자권익센터',
          url: 'http://petitions.kbs.co.kr/section/ptt/intro.html'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 부산홀 공연 + 문화 행사',
    res: {
      message: {
        text: '[ KBS부산 홀/문화행사 ]를 원하시면, 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.',
        photo: {
          url: serverUrl + '/img/8.부산홀.png',
          width: 640,
          height: 480
        }
      },
      keyboard: {
        type: 'buttons',
        buttons: [
          '◇ KBS부산 홀 공연 일정',
          '◇ KBS부산 홀 좌석배치도',
          '◇ KBS부산 갤러리 안내',
          '◇ 문화행사',
          '◆ 처음으로'
        ]
      }
    }
  },
  {
    hook: '◇ KBS부산 홀 공연 일정',
    res: {
      message: {
        text: '◇ KBS부산 홀 공연 일정',
        message_button: {
          label: '◇ KBS부산 홀 공연 일정',
          url: 'https://bit.ly/2A4sS3n'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ KBS부산 홀 좌석배치도',
    res: {
      message: {
        text: '◇ KBS부산 홀 좌석배치도',
        message_button: {
          label: '◇ KBS부산 홀 좌석배치도',
          url: 'https://bit.ly/2RcpwBR'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ KBS부산 갤러리 안내',
    res: {
      message: {
        text: '◇ KBS부산 갤러리 안내',
        message_button: {
          label: '◇ KBS부산 갤러리 안내',
          url: 'https://bit.ly/2RasUx4'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 문화행사',
    res: {
      message: {
        text: '◇ 문화행사',
        message_button: {
          label: '◇ 문화행사',
          url: 'https://bit.ly/2ygYxgN'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 견학 + 광고',
    res: {
      message: {
        text: '[ 견학/광고 ]를 원하시면, 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.',
        photo: {
          url: serverUrl + '/img/9.견학.png',
          width: 640,
          height: 480
        }
      },
      keyboard: {
        type: 'buttons',
        buttons: [
          '◇ KBS부산 견학',
          '◇ KBS본사 서울 견학',
          '◇ KBS부산 광고 안내',
          '◆ 처음으로'
        ]
      }
    }
  },
  {
    hook: '◇ KBS부산 견학',
    res: {
      message: {
        text: '◇ KBS부산 견학',
        message_button: {
          label: '◇ KBS부산 견학',
          url: 'https://bit.ly/2QhzXCU'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ KBS본사 서울 견학',
    res: {
      message: {
        text: '◇ KBS본사 서울 견학',
        message_button: {
          label: '◇ KBS본사 서울 견학',
          url: 'http://office.kbs.co.kr/kbson'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ KBS부산 광고 안내',
    res: {
      message: {
        text: '◇ KBS부산 광고 안내',
        message_button: {
          label: '◇ KBS부산 광고 안내',
          url: 'http://local.kbs.co.kr/index.html?sname=advertise'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 부산 날씨 + 교통 + 관광지도',
    res: {
      message: {
        text: '[ 날씨/교통/관광지도 ]를 원하시면, 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.',
        photo: {
          url: serverUrl + '/img/10.날씨.png',
          width: 640,
          height: 480
        }
      },
      keyboard: {
        type: 'buttons',
        buttons: [
          '◇ 부산 날씨정보',
          '◇ 미세먼지정보',
          '◇ 교통정보',
          '◇ 버스정보',
          '◇ 도시철도정보',
          '◇ 관광정보',
          '◆ 처음으로'
        ]
      }
    }
  },
  {
    hook: '◇ 부산 날씨정보',
    res: {
      message: {
        text: '◇ 부산 날씨정보는 준비 중 입니다..'
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 미세먼지정보',
    res: {
      message: {
        text: '◇ 미세먼지정보는 준비 중 입니다..'
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 교통정보',
    res: {
      message: {
        text: '◇ 교통정보',
        message_button: {
          label: '◇ 교통정보',
          url: 'https://bit.ly/2C0lXJS'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 버스정보',
    res: {
      message: {
        text: '◇ 버스정보',
        message_button: {
          label: '◇ 버스정보',
          url: 'https://bit.ly/2MOt5io'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 도시철도정보',
    res: {
      message: {
        text: '◇ 도시철도정보',
        message_button: {
          label: '◇ 도시철도정보',
          url: 'https://bit.ly/2MuoLFH'
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '◇ 관광정보',
    res: {
      message: {
        text: '◇ 관광정보',
        photo: {
          url: serverUrl + '/img/부산관광지도.png',
          width: 640,
          height: 480
        }
      },
      keyboard: mainButton
    }
  },
  {
    hook: '♣ 직원용',
    res: {
      message: {
        text: '감사합니다. [ 직원용 ]에 대한 정보가 맞으면 \'암호\'를 입력하시고, 다른 메뉴를 확인하시려면 \'처음으로\'를 입력해주세요'
      },
      keyboard: {
        type: 'text'
      }
    }
  },
]

// 뉴스 데이터 마무리 20181031
// 프로그램 + 제보 데이터 마무리 20181108
// 아나운서 + 기상캐스터 데이터 마무리 20181110
// On-Air 실시간 방송 데이터 마무리 20181110
// 
