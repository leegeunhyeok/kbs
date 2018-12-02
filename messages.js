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
const publicIp = require('public-ip')

// 뉴스 데이터 마무리 20181031
// 프로그램 + 제보 데이터 마무리 20181108
// 아나운서 + 기상캐스터 데이터 마무리 20181110
// On-Air 실시간 방송 데이터 마무리 20181110


var serverUrl = ''
publicIp.v4().then(ip => {
  serverUrl = `http://${ip}:${config.get('port')}`

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
      '◇ 부산 날씨 + 교통',
      '♣ 직원용'
    ]
  }


  /* -- */
  const startButton = {
    type: 'buttons',
    buttons: [
      '◇ 서비스 메뉴로 가기',
      '◇ 안내번호 통화하기',
      '◆ 챗봇 단어 입력하기'
    ]
  }


  /* 뉴스 응답 데이터 */
  const newsRes = {
    message: {
      text: '[ 뉴스 ]를 원하시면, 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.',
      photo: {
        url: serverUrl + '/img/2_news.png',
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
        '◆ 이전 단계로 (뉴스/제보)'
      ]
    }
  }


  /* 알 수 없는 입력인 경우 보여줄 데이터 */
  // const fallback = {
  //   message: {
  //     text: '죄송합니다. 문의하신 내용에 대한 답변을 확인할 수 없습니다.\n\n' + 
  //           '다른 메뉴를 확인하시려면 아래의 버튼을 선택해주세요'
  //   },
  //   keyboard: startButton
  // }

  const fallback_text = {
    message: {
      text: '☞ 죄송합니다. 문의하신 내용에 대한 답변을 확인할 수 없습니다. 다른 단어를 입력하거나, [처음으로]를 입력하여 초기화면으로 돌아가세요.\n\n' + 
            '◀예시▶뉴스,제보,프로그램,TV,라디오,다시보기,아나운서,기상캐스터,실시간,온에어,수신료,시청자권익센터,부산홀,공연,광고,견학,날씨,교통,처음으로 등'
    }
  }


  /* 대화 데이터 */
  const datas = [
    {
      hook: '◆ 처음으로',
      res: {
        message: {
          text: '감사합니다. 아래의 대화창에 궁금한 내용을 입력하시면, 문의사항에 답해 드리겠습니다.\n\n' +
                '◀예시▶뉴스,제보,프로그램,수신료,공연,광고,견학,아나운서,기상캐스터,날씨,교통,다시보기,실시간방송,처음으로 등'
        },
        keyboard: startButton
      }
    },
    {
      hook: '◆ 이전 단계로',
      res: {
        message: {
          text: '감사합니다. 아래의 대화창에 궁금한 내용을 입력하시면, 문의사항에 답해 드리겠습니다.\n\n' +
                '◀예시▶뉴스,제보,프로그램,수신료,공연,광고,견학,아나운서,기상캐스터,날씨,교통,다시보기,실시간방송,처음으로 등'
        },
        keyboard: startButton
      }
    },
    {
      hook: '◆ 이전 단계로 (서비스메뉴)',
      res: {
        message: {
          text: '감사합니다. 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.'
        },
        keyboard: mainButton
      }
    },
    {
      hook: '◇ 서비스 메뉴로 가기',
      res: {
        message: {
          text: '감사합니다. 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.'
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
        keyboard: startButton
      }
    },
    {
      hook: '◆ 챗봇 단어 입력하기',
      res: {
        message: {
          text: '아래의 대화창에 궁금한 내용을 입력하면, 문의사항에 답해 드리겠습니다.\n\n◀예시▶뉴스,제보,프로그램,TV,라디오,다시보기,아나운서,기상캐스터,실시간,온에어,수신료,시청자권익센터,부산홀,공연,광고,견학,날씨,교통,처음으로 등'
        }
      }
    },
//-------------------------------------------------------------------------------//
//--------------------------------입력 단어 START---------------------------------//
//-------------------------------------------------------------------------------//
    {
      hook: '처음',
      res: {
        message: {
          text: '감사합니다. 아래의 대화창에 궁금한 내용을 입력하시면, 문의사항에 답해 드리겠습니다.\n\n' +
                '◀예시▶뉴스,제보,프로그램,수신료,공연,광고,견학,아나운서,기상캐스터,날씨,교통,다시보기,실시간방송,처음으로 등'
        },
        keyboard: mainButton
      }
    },
    {
      hook: '처음으로',
      res: {
        message: {
          text: '감사합니다. 아래의 대화창에 궁금한 내용을 입력하시면, 문의사항에 답해 드리겠습니다.\n\n' +
                '◀예시▶뉴스,제보,프로그램,수신료,공연,광고,견학,아나운서,기상캐스터,날씨,교통,다시보기,실시간방송,처음으로 등'
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
      hook: '제보',
      res: {
        message: {
          text: '[ 뉴스제보 ]를 원하시면, 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.',
          photo: {
            url: serverUrl + '/img/1_kbs_report.png',
            width: 640,
            height: 480
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 부산뉴스 제보',
            '◇ 본사뉴스 제보',
            '◆ 이전 단계로 (제보)'
          ]
        }
      }
    },
    {
      hook: '프로그램',
      res: {
        message: {
          text: '[ 프로그램 ]을 원하시면, 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.',
          photo: {
            url: serverUrl + '/img/3_program.png',
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
            '◆ 이전 단계로 (서비스메뉴)'
          ]
        }
      }
    },
    {
      hook: '다시보기',
      res: {
        message: {
          text: '[ 다시보기 ]을 원하시면, 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.',
          photo: {
            url: serverUrl + '/img/3_program.png',
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
            '◆ 이전 단계로 (서비스메뉴)'
          ]
        }
      }
    },
    {
      hook: '라디오',
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
            '◆ 이전 단계로 (프로그램)'
          ]
        }
      }
    },
    {
      hook: '아나운서',
      res: {
        message: {
          text: '[ 아나운서 프로필 ]을 원하시면, 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.',
          photo: {
            url: serverUrl + '/img/4_announcer.png',
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
            '◆ 이전 단계로 (아나운서/기상캐스터)'
          ]
        }
      }
    },
    {
      hook: '기상캐스터',
      res: {
        message: {
          text: '[ 기상캐스터 프로필 ]을 원하시면, 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.',
          photo: {
            url: serverUrl + '/img/5_weather.png',
            width: 640,
            height: 480
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 홍나실 기상캐스터',
            '★ KBS본사  기상캐스터',
            '◆ 이전 단계로 (아나운서/기상캐스터)'
          ]
        }
      }
    },
    {
      hook: '실시간',
      res: {
        message: {
          text: '[ 실시간방송 ]을 원하시면, 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.',
          photo: {
            url: serverUrl + '/img/6_live.png',
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
            '◆ 이전 단계로 (서비스메뉴)'
          ]
        }
      }
    },
    {
      hook: '온에어',
      res: {
        message: {
          text: '[ 실시간방송 ]을 원하시면, 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.',
          photo: {
            url: serverUrl + '/img/6_live.png',
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
            '◆ 이전 단계로 (서비스메뉴)'
          ]
        }
      }
    },
    {
      hook: '수신료',
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
            '◆ 이전 단계로 (수신료/시청자권익센터)'
          ]
        }
      }
    },
    {
      hook: '시청자권익센터',
      res: {
        message: {
          text: '감사합니다. 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.'
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 수신료',
            '◇ 시청자권익센터',
            '◆ 이전 단계로 (서비스메뉴)'
          ]
        }
      }
    },
    {
      hook: '부산홀',
      res: {
        message: {
          text: '[ KBS부산 홀/문화행사 ]를 원하시면, 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.',
          photo: {
            url: serverUrl + '/img/8_busan_hall.png',
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
            '◆ 이전 단계로 (서비스메뉴)'
          ]
        }
      }
    },
    {
      hook: '공연',
      res: {
        message: {
          text: '[ KBS부산 홀/문화행사 ]를 원하시면, 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.',
          photo: {
            url: serverUrl + '/img/8_busan_hall.png',
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
            '◆ 이전 단계로 (서비스메뉴)'
          ]
        }
      }
    },
    {
      hook: '광고',
      res: {
        message: {
          text: '[ 견학/광고 ]를 원하시면, 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.',
          photo: {
            url: serverUrl + '/img/9_excursion.png',
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
            '◆ 이전 단계로 (서비스메뉴)'
          ]
        }
      }
    },
    {
      hook: '견학',
      res: {
        message: {
          text: '[ 견학/광고 ]를 원하시면, 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.',
          photo: {
            url: serverUrl + '/img/9_excursion.png',
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
            '◆ 이전 단계로 (서비스메뉴)'
          ]
        }
      }
    },
    {
      hook: '날씨',
      res: {
        message: {
          text: '[ 날씨/교통 ]를 원하시면, 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.',
          photo: {
            url: serverUrl + '/img/10_weather.png',
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
            '◆ 이전 단계로 (서비스메뉴)'
          ]
        }
      }
    },
    {
      hook: '교통',
      res: {
        message: {
          text: '[ 날씨/교통 ]를 원하시면, 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.',
          photo: {
            url: serverUrl + '/img/10_weather.png',
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
            '◆ 이전 단계로 (서비스메뉴)'
          ]
        }
      }
    },
    {
      hook: 'TV',
      res: {
        message: {
          text: '감사합니다. 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.',
          photo: {
            url: serverUrl + '/img/3_program.png',
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
            '◆ 이전 단계로 (서비스메뉴)'
          ]
        }
      }
    },
    {
      hook: 'tv',
      res: {
        message: {
          text: '감사합니다. 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.',
          photo: {
            url: serverUrl + '/img/3_program.png',
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
            '◆ 이전 단계로 (서비스메뉴)'
          ]
        }
      }
    }
//-----------------------------------------------------------------------------//
//--------------------------------입력 단어 END---------------------------------//
//-----------------------------------------------------------------------------//
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
            '◆ 이전 단계로 (서비스메뉴)'
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
            url: serverUrl + '/img/1_kbs_report.png',
            width: 640,
            height: 480
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 부산뉴스 제보',
            '◇ 본사뉴스 제보',
            '◆ 이전 단계로 (뉴스/제보)'
          ]
        }
      }
    },
    {
      hook: '◆ 이전 단계로 (뉴스/제보)',
      res: {
        message: {
          text: '감사합니다. 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.'
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 뉴스 제보',
            '◇ 뉴스',
            '◆ 이전 단계로 (서비스메뉴)'
          ]
        }
      }
    },
    {
      hook: '◇ 부산뉴스 제보',
      res: {
        message: {
          text: '◇ 부산뉴스 제보',
          message_button: {
            label: '부산뉴스 제보 바로가기',
            url: 'https://bit.ly/2pQUuTT'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 부산뉴스 제보',
            '◇ 본사뉴스 제보',
            '◆ 이전 단계로 (뉴스/제보)'
          ]
        }
      }
    },
    {
      hook: '◇ 본사뉴스 제보',
      res: {
        message: {
          text: '◇ 본사뉴스 제보',
          message_button: {
            label: '본사뉴스 제보 바로가기',
            url: 'https://bit.ly/1OBewFL'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 부산뉴스 제보',
            '◇ 본사뉴스 제보',
            '◆ 이전 단계로 (뉴스/제보)'
          ]
        }
      }
    },
    {
      hook: '◇ 뉴스광장',
      res: {
        message: {
          text: '◇ 뉴스광장',
          message_button: {
            label: '뉴스광장 바로가기',
            url: 'https://bit.ly/2PsUS6b'
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
            '◆ 이전 단계로 (뉴스/제보)'
          ]
        }
      }
    },
    {
      hook: '◇ 뉴스930',
      res: {
        message: {
          text: '◇ 뉴스930',
          message_button: {
            label: '뉴스930 바로가기',
            url: 'https://bit.ly/2QGVqp6'
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
            '◆ 이전 단계로 (뉴스/제보)'
          ]
        }
      }
    },
    {
      hook: '◇ 뉴스7 네트워크',
      res: {
        message: {
          text: '◇ 뉴스7 네트워크',
          message_button: {
            label: '뉴스7 네트워크 바로가기',
            url: 'https://bit.ly/2QGfFDi'
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
            '◆ 이전 단계로 (뉴스/제보)'
          ]
        }
      }
    },
    {
      hook: '◇ 뉴스9',
      res: {
        message: {
          text: '◇ 뉴스9',
          message_button: {
            label: '뉴스9 바로가기',
            url: 'https://bit.ly/2REcFsu'
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
            '◆ 이전 단계로 (뉴스/제보)'
          ]
        }
      }
    },
    {
      hook: '◇ 주요뉴스',
      res: {
        message: {
          text: '◇ 주요뉴스',
          message_button: {
            label: '주요뉴스 바로가기',
            url: 'https://bit.ly/2A0aLvz'
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
            '◆ 이전 단계로 (뉴스/제보)'
          ]
        }
      }
    },
    {
      hook: '◇ 프로그램 + 다시보기',
      res: {
        message: {
          text: '[ 프로그램 / 다시보기 ]를 원하시면, 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.',
          photo: {
            url: serverUrl + '/img/3_program.png',
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
            '◆ 이전 단계로 (서비스메뉴)'
          ]
        }
      }
    },
    {
      hook: '◆ 이전 단계로 (프로 / 다시보기)',
      res: {
        message: {
          text: '감사합니다. 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.',
          photo: {
            url: serverUrl + '/img/3_program.png',
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
            '◆ 이전 단계로 (서비스메뉴)'
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
            '◇ 열린채널',
            '◆ 이전 단계로 (프로 / 다시보기)'
          ]
        }
      }
    },
    {
      hook: '◆ 이전 단계로 (프로그램)',
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
            '◇ 열린채널',
            '◆ 이전 단계로 (프로 / 다시보기)'
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
            '◆ 이전 단계로 (프로그램)'
          ]
        }
      }
    },
    {
      hook: '◇ K 토크 프로그램 정보',
      res: {
        message: {
          text: '◇ K 토크 프로그램 정보',
          message_button: {
            label: 'K 토크 정보',
            url: 'http://program.kbs.co.kr/1tv/local/ktalk'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ K 토크 프로그램 정보',
            '◇ K 토크 방송내용',
            '◇ K 토크 다시보기',
            '◆ 이전 단계로 (프로그램)'
          ]
        }
      }
    },
    {
      hook: '◇ K 토크 방송내용',
      res: {
        message: {
          text: '◇ K 토크 방송내용',
          message_button: {
            label: 'K 토크 방송내용',
            url: 'https://bit.ly/2OfPabd'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ K 토크 프로그램 정보',
            '◇ K 토크 방송내용',
            '◇ K 토크 다시보기',
            '◆ 이전 단계로 (프로그램)'
          ]
        }
      }
    },
    {
      hook: '◇ K 토크 다시보기',
      res: {
        message: {
          text: '◇ K 토크 다시보기',
          message_button: {
            label: 'K 토크 다시보기',
            url: 'https://bit.ly/2RMrlpm'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ K 토크 프로그램 정보',
            '◇ K 토크 방송내용',
            '◇ K 토크 다시보기',
            '◆ 이전 단계로 (프로그램)'
          ]
        }
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
            '◆ 이전 단계로 (프로그램)'
          ]
        }
      }
    },
    {
      hook: '◇ 아침마당 프로그램 정보',
      res: {
        message: {
          text: '◇ 아침마당 프로그램 정보',
          message_button: {
            label: '아침마당 정보',
            url: 'http://program.kbs.co.kr/1tv/local/bsmorma'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 아침마당 프로그램 정보',
            '◇ 아침마당 방송내용',
            '◇ 아침마당 다시보기',
            '◆ 이전 단계로 (프로그램)'
          ]
        }
      }
    },
    {
      hook: '◇ 아침마당 방송내용',
      res: {
        message: {
          text: '◇ 아침마당 방송내용',
          message_button: {
            label: '아침마당 방송내용',
            url: 'https://bit.ly/2IKw479'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 아침마당 프로그램 정보',
            '◇ 아침마당 방송내용',
            '◇ 아침마당 다시보기',
            '◆ 이전 단계로 (프로그램)'
          ]
        }
      }
    },
    {
      hook: '◇ 아침마당 다시보기',
      res: {
        message: {
          text: '◇ 아침마당 다시보기',
          message_button: {
            label: '아침마당 다시보기',
            url: 'https://bit.ly/2yCogQ3'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 아침마당 프로그램 정보',
            '◇ 아침마당 방송내용',
            '◇ 아침마당 다시보기',
            '◆ 이전 단계로 (프로그램)'
          ]
        }
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
            '◆ 이전 단계로 (프로그램)'
          ]
        }
      }
    },
    {
      hook: '◇ 생생투데이 프로그램 정보',
      res: {
        message: {
          text: '◇ 생생투데이 프로그램 정보',
          message_button: {
            label: '생생투데이 정보',
            url: 'http://program.kbs.co.kr/1tv/local/sstday'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 생생투데이 프로그램 정보',
            '◇ 생생투데이 방송내용',
            '◇ 생생투데이 다시보기',
            '◆ 이전 단계로 (프로그램)'
          ]
        }
      }
    },
    {
      hook: '◇ 생생투데이 방송내용',
      res: {
        message: {
          text: '◇ 생생투데이 방송내용',
          message_button: {
            label: '생생투데이 방송내용',
            url: 'https://bit.ly/2IQe3o5'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 생생투데이 프로그램 정보',
            '◇ 생생투데이 방송내용',
            '◇ 생생투데이 다시보기',
            '◆ 이전 단계로 (프로그램)'
          ]
        }
      }
    },
    {
      hook: '◇ 생생투데이 다시보기',
      res: {
        message: {
          text: '◇ 생생투데이 다시보기',
          message_button: {
            label: '생생투데이 다시보기',
            url: 'https://bit.ly/2EjNwRf'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 생생투데이 프로그램 정보',
            '◇ 생생투데이 방송내용',
            '◇ 생생투데이 다시보기',
            '◆ 이전 단계로 (프로그램)'
          ]
        }
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
            '◆ 이전 단계로 (프로그램)'
          ]
        }
      }
    },
    {
      hook: '◇ 뮤직토크쇼 가요1번지 프로그램 정보',
      res: {
        message: {
          text: '◇ 뮤직토크쇼 가요1번지 프로그램 정보',
          message_button: {
            label: '뮤직토크쇼 가요1번지 정보',
            url: 'http://program.kbs.co.kr/1tv/local/gayo1'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 뮤직토크쇼 가요1번지 프로그램 정보',
            '◇ 뮤직토크쇼 가요1번지 방송내용',
            '◇ 뮤직토크쇼 가요1번지 다시보기',
            '◆ 이전 단계로 (프로그램)'
          ]
        }
      }
    },
    {
      hook: '◇ 뮤직토크쇼 가요1번지 방송내용',
      res: {
        message: {
          text: '◇ 뮤직토크쇼 가요1번지 방송내용',
          message_button: {
            label: '뮤직토크쇼 가요1번지 방송내용',
            url: 'https://bit.ly/2NsaN2N'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 뮤직토크쇼 가요1번지 프로그램 정보',
            '◇ 뮤직토크쇼 가요1번지 방송내용',
            '◇ 뮤직토크쇼 가요1번지 다시보기',
            '◆ 이전 단계로 (프로그램)'
          ]
        }
      }
    },
    {
      hook: '◇ 뮤직토크쇼 가요1번지 다시보기',
      res: {
        message: {
          text: '◇ 뮤직토크쇼 가요1번지 다시보기',
          message_button: {
            label: '뮤직토크쇼 가요1번지 다시보기',
            url: 'https://bit.ly/2NGoFqe'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 뮤직토크쇼 가요1번지 프로그램 정보',
            '◇ 뮤직토크쇼 가요1번지 방송내용',
            '◇ 뮤직토크쇼 가요1번지 다시보기',
            '◆ 이전 단계로 (프로그램)'
          ]
        }
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
            '◆ 이전 단계로 (프로그램)'
          ]
        }
      }
    },
    {
      hook: '◇ 무대와 객석 프로그램 정보',
      res: {
        message: {
          text: '◇ 무대와 객석 프로그램 정보',
          message_button: {
            label: '무대와 객석 정보',
            url: 'http://program.kbs.co.kr/1tv/local/stage'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 무대와 객석 프로그램 정보',
            '◇ 무대와 객석 방송내용',
            '◇ 무대와 객석 다시보기',
            '◆ 이전 단계로 (프로그램)'
          ]
        }
      }
    },
    {
      hook: '◇ 무대와 객석 방송내용',
      res: {
        message: {
          text: '◇ 무대와 객석 방송내용',
          message_button: {
            label: '무대와 객석 방송내용',
            url: 'https://bit.ly/2QDFnZb'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 무대와 객석 프로그램 정보',
            '◇ 무대와 객석 방송내용',
            '◇ 무대와 객석 다시보기',
            '◆ 이전 단계로 (프로그램)'
          ]
        }
      }
    },
    {
      hook: '◇ 무대와 객석 다시보기',
      res: {
        message: {
          text: '◇ 무대와 객석 다시보기',
          message_button: {
            label: '무대와 객석 다시보기',
            url: 'https://bit.ly/2RKwVZu'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 무대와 객석 프로그램 정보',
            '◇ 무대와 객석 방송내용',
            '◇ 무대와 객석 다시보기',
            '◆ 이전 단계로 (프로그램)'
          ]
        }
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
            '◆ 이전 단계로 (프로그램)'
          ]
        }
      }
    },
    {
      hook: '◇ 전국을 달린다 프로그램 정보',
      res: {
        message: {
          text: '◇ 전국을 달린다 프로그램 정보',
          message_button: {
            label: '전국을 달린다 정보',
            url: 'http://program.kbs.co.kr/1tv/local/jeonguk'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 전국을 달린다 프로그램 정보',
            '◇ 전국을 달린다 방송내용',
            '◇ 전국을 달린다 다시보기',
            '◆ 이전 단계로 (프로그램)'
          ]
        }
      }
    },
    {
      hook: '◇ 전국을 달린다 방송내용',
      res: {
        message: {
          text: '◇ 전국을 달린다 방송내용',
          message_button: {
            label: '전국을 달린다 방송내용',
            url: 'https://bit.ly/2pHOInk'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 전국을 달린다 프로그램 정보',
            '◇ 전국을 달린다 방송내용',
            '◇ 전국을 달린다 다시보기',
            '◆ 이전 단계로 (프로그램)'
          ]
        }
      }
    },
    {
      hook: '◇ 전국을 달린다 다시보기',
      res: {
        message: {
          text: '◇ 전국을 달린다 다시보기',
          message_button: {
            label: '전국을 달린다 다시보기',
            url: 'https://bit.ly/2IRFwFB'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 전국을 달린다 프로그램 정보',
            '◇ 전국을 달린다 방송내용',
            '◇ 전국을 달린다 다시보기',
            '◆ 이전 단계로 (프로그램)'
          ]
        }
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
            '◆ 이전 단계로 (프로그램)'
          ]
        }
      }
    },
    {
      hook: '◇ 전국을 달린다 스페셜 프로그램 정보',
      res: {
        message: {
          text: '◇ 전국을 달린다 스페셜 프로그램 정보',
          message_button: {
            label: '전국을 달린다 스페셜 정보',
            url: 'http://program.kbs.co.kr/1tv/local/special'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 전국을 달린다 스페셜 프로그램 정보',
            '◇ 전국을 달린다 스페셜 방송내용',
            '◇ 전국을 달린다 스페셜 다시보기',
            '◆ 이전 단계로 (프로그램)'
          ]
        }
      }
    },
    {
      hook: '◇ 전국을 달린다 스페셜 방송내용',
      res: {
        message: {
          text: '◇ 전국을 달린다 스페셜 방송내용',
          message_button: {
            label: '전국을 달린다 스페셜 방송내용',
            url: 'https://bit.ly/2pHOInk'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 전국을 달린다 스페셜 프로그램 정보',
            '◇ 전국을 달린다 스페셜 방송내용',
            '◇ 전국을 달린다 스페셜 다시보기',
            '◆ 이전 단계로 (프로그램)'
          ]
        }
      }
    },
    {
      hook: '◇ 전국을 달린다 스페셜 다시보기',
      res: {
        message: {
          text: '◇ 전국을 달린다 스페셜 다시보기',
          message_button: {
            label: '전국을 달린다 스페셜 다시보기',
            url: 'https://bit.ly/2OY6mRY'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 전국을 달린다 스페셜 프로그램 정보',
            '◇ 전국을 달린다 스페셜 방송내용',
            '◇ 전국을 달린다 스페셜 다시보기',
            '◆ 이전 단계로 (프로그램)'
          ]
        }
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
            '◆ 이전 단계로 (프로그램)'
          ]
        }
      }
    },
    {
      hook: '◇ KBS부산 스페셜 프로그램 정보',
      res: {
        message: {
          text: '◇ KBS부산 스페셜 프로그램 정보',
          message_button: {
            label: 'KBS부산 스페셜 정보',
            url: 'http://program.kbs.co.kr/1tv/local/invbs'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ KBS부산 스페셜 프로그램 정보',
            '◇ KBS부산 스페셜 방송내용',
            '◇ KBS부산 스페셜 다시보기',
            '◆ 이전 단계로 (프로그램)'
          ]
        }
      }
    },
    {
      hook: '◇ KBS부산 스페셜 방송내용',
      res: {
        message: {
          text: '◇ KBS부산 스페셜 방송내용',
          message_button: {
            label: 'KBS부산 스페셜 방송내용',
            url: 'https://bit.ly/2OYiOkA'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ KBS부산 스페셜 프로그램 정보',
            '◇ KBS부산 스페셜 방송내용',
            '◇ KBS부산 스페셜 다시보기',
            '◆ 이전 단계로 (프로그램)'
          ]
        }
      }
    },
    {
      hook: '◇ KBS부산 스페셜 다시보기',
      res: {
        message: {
          text: '◇ KBS부산 스페셜 다시보기',
          message_button: {
            label: 'KBS부산 스페셜 다시보기',
            url: 'https://bit.ly/2QN8Lw2'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ KBS부산 스페셜 프로그램 정보',
            '◇ KBS부산 스페셜 방송내용',
            '◇ KBS부산 스페셜 다시보기',
            '◆ 이전 단계로 (프로그램)'
          ]
        }
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
            '◆ 이전 단계로 (프로그램)'
          ]
        }
      }
    },
    {
      hook: '◇ 열린채널 프로그램 정보',
      res: {
        message: {
          text: '◇ 열린채널 프로그램 정보',
          message_button: {
            label: '열린채널 정보',
            url: 'http://program.kbs.co.kr/1tv/local/opnchbs'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 열린채널 프로그램 정보',
            '◇ 열린채널 방송내용',
            '◇ 열린채널 다시보기',
            '◆ 이전 단계로 (프로그램)'
          ]
        }
      }
    },
    {
      hook: '◇ 열린채널 방송내용',
      res: {
        message: {
          text: '◇ 열린채널 방송내용',
          message_button: {
            label: '열린채널 방송내용',
            url: 'https://bit.ly/2C59uVn'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 열린채널 프로그램 정보',
            '◇ 열린채널 방송내용',
            '◇ 열린채널 다시보기',
            '◆ 이전 단계로 (프로그램)'
          ]
        }
      }
    },
    {
      hook: '◇ 열린채널 다시보기',
      res: {
        message: {
          text: '◇ 열린채널 다시보기',
          message_button: {
            label: '열린채널 다시보기',
            url: 'https://bit.ly/2QN8Lw2'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 열린채널 프로그램 정보',
            '◇ 열린채널 방송내용',
            '◇ 열린채널 다시보기',
            '◆ 이전 단계로 (프로그램)'
          ]
        }
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
            '◆ 이전 단계로 (프로 / 다시보기)'
          ]
        }
      }
    },
    {
      hook: '◆ 이전 단계로 (라디오)',
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
            '◆ 이전 단계로 (프로 / 다시보기)'
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
            '◆ 이전 단계로 (라디오)'
          ]
        }
      }
    },
    {
      hook: '◇ 굿모닝 부산 프로그램 정보',
      res: {
        message: {
          text: '◇ 굿모닝 부산 프로그램 정보',
          message_button: {
            label: '굿모닝 부산 정보',
            url: 'https://bit.ly/2ISGn9j'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 굿모닝 부산 프로그램 정보',
            '◇ 굿모닝 부산 방송내용',
            '◆ 이전 단계로 (라디오)'
          ]
        }
      }
    },
    {
      hook: '◇ 굿모닝 부산 방송내용',
      res: {
        message: {
          text: '◇ 굿모닝 부산 방송내용',
          message_button: {
            label: '굿모닝 부산 방송내용',
            url: 'https://bit.ly/2IKw479'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 굿모닝 부산 프로그램 정보',
            '◇ 굿모닝 부산 방송내용',
            '◆ 이전 단계로 (라디오)'
          ]
        }
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
            '◆ 이전 단계로 (라디오)'
          ]
        }
      }
    },
    {
      hook: '◇ 라디오 정보센터 프로그램 정보',
      res: {
        message: {
          text: '◇ 라디오 정보센터 프로그램 정보',
          message_button: {
            label: '라디오 정보센터 정보',
            url: 'https://bit.ly/2NEZHaO'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 라디오 정보센터 프로그램 정보',
            '◇ 라디오 정보센터 방송내용',
            '◆ 이전 단계로 (라디오)'
          ]
        }
      }
    },
    {
      hook: '◇ 라디오 정보센터 방송내용',
      res: {
        message: {
          text: '◇ 라디오 정보센터 방송내용',
          message_button: {
            label: '라디오 정보센터 방송내용',
            url: 'https://bit.ly/2RMhvUv'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 라디오 정보센터 프로그램 정보',
            '◇ 라디오 정보센터 방송내용',
            '◆ 이전 단계로 (라디오)'
          ]
        }
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
            '◇ 뮤직데이트 문자참여',
            '◆ 이전 단계로 (라디오)'
          ]
        }
      }
    },
    {
      hook: '◇ 뮤직데이트 프로그램 정보',
      res: {
        message: {
          text: '◇ 뮤직데이트 프로그램 정보',
          message_button: {
            label: '뮤직데이트 정보',
            url: 'https://bit.ly/2RK6HGt'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 뮤직데이트 프로그램 정보',
            '◇ 뮤직데이트 선곡표',
            '◇ 뮤직데이트 문자참여',
            '◆ 이전 단계로 (라디오)'
          ]
        }
      }
    },
    {
      hook: '◇ 뮤직데이트 선곡표',
      res: {
        message: {
          text: '◇ 뮤직데이트 선곡표',
          message_button: {
            label: '뮤직데이트 선곡표',
            url: 'https://bit.ly/2pSscsa'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 뮤직데이트 프로그램 정보',
            '◇ 뮤직데이트 선곡표',
            '◇ 뮤직데이트 문자참여',
            '◆ 이전 단계로 (라디오)'
          ]
        }
      }
    },
    {
      hook: '◇ 뮤직데이트 문자참여',
      res: {
        message: {
          text: '◇ 뮤직데이트 문자참여',
          message_button: {
            label: '뮤직데이트 문자참여',
            url: 'https://bit.ly/2DIyUKV'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 뮤직데이트 프로그램 정보',
            '◇ 뮤직데이트 선곡표',
            '◇ 뮤직데이트 문자참여',
            '◆ 이전 단계로 (라디오)'
          ]
        }
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
            '◆ 이전 단계로 (라디오)'
          ]
        }
      }
    },
    {
      hook: '◇ 부산은 지금 프로그램 정보',
      res: {
        message: {
          text: '◇ 부산은 지금 프로그램 정보',
          message_button: {
            label: '부산은 지금 정보',
            url: 'https://bit.ly/2RNhT5p'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 부산은 지금 프로그램 정보',
            '◇ 부산은 지금 방송내용',
            '◇ 부산은 지금 문자 참여',
            '◆ 이전 단계로 (라디오)'
          ]
        }
      }
    },
    {
      hook: '◇ 부산은 지금 방송내용',
      res: {
        message: {
          text: '◇ 부산은 지금 방송내용',
          message_button: {
            label: '부산은 지금 방송내용',
            url: 'https://bit.ly/2OTQyQ9'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 부산은 지금 프로그램 정보',
            '◇ 부산은 지금 방송내용',
            '◇ 부산은 지금 문자 참여',
            '◆ 이전 단계로 (라디오)'
          ]
        }
      }
    },
    {
      hook: '◇ 부산은 지금 문자 참여',
      res: {
        message: {
          text: '◇ 부산은 지금 문자 참여',
          message_button: {
            label: '부산은 지금 문자 참여',
            url: 'https://bit.ly/2A82HJ7'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 부산은 지금 프로그램 정보',
            '◇ 부산은 지금 방송내용',
            '◇ 부산은 지금 문자 참여',
            '◆ 이전 단계로 (라디오)'
          ]
        }
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
            '◆ 이전 단계로 (라디오)'
          ]
        }
      }
    },
    {
      hook: '◇ 즐거운 저녁길 프로그램 정보',
      res: {
        message: {
          text: '◇ 즐거운 저녁길 프로그램 정보',
          message_button: {
            label: '즐거운 저녁길 정보',
            url: 'https://bit.ly/2RKEJKM'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 즐거운 저녁길 프로그램 정보',
            '◇ 즐거운 저녁길 선곡표',
            '◇ 즐거운 저녁길 문자 참여',
            '◆ 이전 단계로 (라디오)'
          ]
        }
      }
    },
    {
      hook: '◇ 즐거운 저녁길 선곡표',
      res: {
        message: {
          text: '◇ 즐거운 저녁길 선곡표',
          message_button: {
            label: '즐거운 저녁길 선곡표',
            url: 'https://bit.ly/2Ch3GYO'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 즐거운 저녁길 프로그램 정보',
            '◇ 즐거운 저녁길 선곡표',
            '◇ 즐거운 저녁길 문자 참여',
            '◆ 이전 단계로 (라디오)'
          ]
        }
      }
    },
    {
      hook: '◇ 즐거운 저녁길 문자 참여',
      res: {
        message: {
          text: '◇ 즐거운 저녁길 문자 참여',
          message_button: {
            label: '즐거운 저녁길 문자 참여',
            url: 'https://bit.ly/2Er1Zeq'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 즐거운 저녁길 프로그램 정보',
            '◇ 즐거운 저녁길 선곡표',
            '◇ 즐거운 저녁길 문자 참여',
            '◆ 이전 단계로 (라디오)'
          ]
        }
      }
    },
    {
      hook: '★ 라디오 주파수 안내',
      res: {
        message: {
          text: '★ 라디오 주파수 안내\n\n\n▷ 1라디오: 103.7 MHz  ( AM 891KHz )\n\n▷ 2라디오: 97.1 MHz\n\n▷ 음악FM: 92.7 MHz'
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
            '◆ 이전 단계로 (프로 / 다시보기)'
          ]
        }
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
            '◆ 이전 단계로 (프로 / 다시보기)'
          ]
        }
      }
    },
    {
      hook: '◆ 이전 단계로 (프로그램 + 참여)',
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
            '◆ 이전 단계로 (프로 / 다시보기)'
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
            '◆ 이전 단계로 (프로그램 + 참여)'
          ]
        }
      }
    },
    {
      hook: '★ 생방송 아침이 좋다 프로그램 정보',
      res: {
        message: {
          text: '★ 생방송 아침이 좋다 프로그램 정보',
          message_button: {
            label: '생방송 아침이 좋다 정보',
            url: 'https://bit.ly/2CcHoYo'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '★ 생방송 아침이 좋다 프로그램 정보',
            '★ 생방송 아침이 좋다 방송내용',
            '★ 생방송 아침이 좋다 제보하기',
            '◆ 이전 단계로 (프로그램 + 참여)'
          ]
        }
      }
    },
    {
      hook: '★ 생방송 아침이 좋다 방송내용',
      res: {
        message: {
          text: '★ 생방송 아침이 좋다 방송내용',
          message_button: {
            label: '생방송 아침이 좋다 방송내용',
            url: 'https://bit.ly/2A8gBe9'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '★ 생방송 아침이 좋다 프로그램 정보',
            '★ 생방송 아침이 좋다 방송내용',
            '★ 생방송 아침이 좋다 제보하기',
            '◆ 이전 단계로 (프로그램 + 참여)'
          ]
        }
      }
    },
    {
      hook: '★ 생방송 아침이 좋다 제보하기',
      res: {
        message: {
          text: '★ 생방송 아침이 좋다 제보하기',
          message_button: {
            label: '생방송 아침이 좋다 제보하기',
            url: 'https://bit.ly/2ygdD5Y'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '★ 생방송 아침이 좋다 프로그램 정보',
            '★ 생방송 아침이 좋다 방송내용',
            '★ 생방송 아침이 좋다 제보하기',
            '◆ 이전 단계로 (프로그램 + 참여)'
          ]
        }
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
            '◆ 이전 단계로 (프로그램 + 참여)'
          ]
        }
      }
    },
    {
      hook: '★ 아침마당 프로그램 정보',
      res: {
        message: {
          text: '★ 아침마당 프로그램 정보',
          message_button: {
            label: '아침마당 정보',
            url: 'https://bit.ly/2RO4E4u'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '★ 아침마당 프로그램 정보',
            '★ 아침마당 방송내용',
            '★ 아침마당 티벗 투표하기',
            '◆ 이전 단계로 (프로그램 + 참여)'
          ]
        }
      }
    },
    {
      hook: '★ 아침마당 방송내용',
      res: {
        message: {
          text: '★ 아침마당 방송내용',
          message_button: {
            label: '아침마당 방송내용',
            url: 'https://bit.ly/2CfEMZW'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '★ 아침마당 프로그램 정보',
            '★ 아침마당 방송내용',
            '★ 아침마당 티벗 투표하기',
            '◆ 이전 단계로 (프로그램 + 참여)'
          ]
        }
      }
    },
    {
      hook: '★ 아침마당 티벗 투표하기',
      res: {
        message: {
          text: '★ 아침마당 티벗 투표하기',
          message_button: {
            label: '아침마당 티벗 투표하기',
            url: 'https://bit.ly/2pQRRkN'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '★ 아침마당 프로그램 정보',
            '★ 아침마당 방송내용',
            '★ 아침마당 티벗 투표하기',
            '◆ 이전 단계로 (프로그램 + 참여)'
          ]
        }
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
            '◆ 이전 단계로 (프로그램 + 참여)'
          ]
        }
      }
    },
    {
      hook: '★ 무엇이든 물어보세요 프로그램 정보',
      res: {
        message: {
          text: '★ 무엇이든 물어보세요 프로그램 정보',
          message_button: {
            label: '무엇이든 물어보세요 정보',
            url: 'https://bit.ly/2A7IV0g'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '★ 무엇이든 물어보세요 프로그램 정보',
            '★ 무엇이든 물어보세요 방송내용',
            '★ 무엇이든 물어보세요 티벗 투표하기',
            '◆ 이전 단계로 (프로그램 + 참여)'
          ]
        }
      }
    },
    {
      hook: '★ 무엇이든 물어보세요 방송내용',
      res: {
        message: {
          text: '★ 무엇이든 물어보세요 방송내용',
          message_button: {
            label: '무엇이든 물어보세요 방송내용',
            url: 'https://bit.ly/2RNpTD9'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '★ 무엇이든 물어보세요 프로그램 정보',
            '★ 무엇이든 물어보세요 방송내용',
            '★ 무엇이든 물어보세요 티벗 투표하기',
            '◆ 이전 단계로 (프로그램 + 참여)'
          ]
        }
      }
    },
    {
      hook: '★ 무엇이든 물어보세요 제보하기',
      res: {
        message: {
          text: '★ 무엇이든 물어보세요 제보하기',
          message_button: {
            label: '무엇이든 물어보세요 제보하기',
            url: 'https://bit.ly/2pP73yK'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '★ 무엇이든 물어보세요 프로그램 정보',
            '★ 무엇이든 물어보세요 방송내용',
            '★ 무엇이든 물어보세요 티벗 투표하기',
            '◆ 이전 단계로 (프로그램 + 참여)'
          ]
        }
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
            '◆ 이전 단계로 (프로그램 + 참여)'
          ]
        }
      }
    },
    {
      hook: '★ 6시 내고향 프로그램 정보',
      res: {
        message: {
          text: '★ 6시 내고향 프로그램 정보',
          message_button: {
            label: '6시 내고향 정보',
            url: 'https://bit.ly/2yE5szM'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '★ 6시 내고향 프로그램 정보',
            '★ 6시 내고향 방송내용',
            '★ 6시 내고향 제보하기',
            '◆ 이전 단계로 (프로그램 + 참여)'
          ]
        }
      }
    },
    {
      hook: '★ 6시 내고향 방송내용',
      res: {
        message: {
          text: '★ 6시 내고향 방송내용',
          message_button: {
            label: '6시 내고향 방송내용',
            url: 'https://bit.ly/2A88ajf'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '★ 6시 내고향 프로그램 정보',
            '★ 6시 내고향 방송내용',
            '★ 6시 내고향 제보하기',
            '◆ 이전 단계로 (프로그램 + 참여)'
          ]
        }
      }
    },
    {
      hook: '★ 6시 내고향 제보하기',
      res: {
        message: {
          text: '★ 6시 내고향 제보하기',
          message_button: {
            label: '6시 내고향 제보하기',
            url: 'https://bit.ly/2NDR9Rp'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '★ 6시 내고향 프로그램 정보',
            '★ 6시 내고향 방송내용',
            '★ 6시 내고향 제보하기',
            '◆ 이전 단계로 (프로그램 + 참여)'
          ]
        }
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
            '◆ 이전 단계로 (프로그램 + 참여)'
          ]
        }
      }
    },
    {
      hook: '★ 2TV 생생정보 프로그램 정보',
      res: {
        message: {
          text: '★ 2TV 생생정보 프로그램 정보',
          message_button: {
            label: '2TV 생생정보 정보',
            url: 'https://bit.ly/2QQCtAB'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '★ 2TV 생생정보 프로그램 정보',
            '★ 2TV 생생정보 방송내용',
            '★ 2TV 생생정보 제보하기',
            '◆ 이전 단계로 (프로그램 + 참여)'
          ]
        }
      }
    },
    {
      hook: '★ 2TV 생생정보 방송내용',
      res: {
        message: {
          text: '★ 2TV 생생정보 방송내용',
          message_button: {
            label: '2TV 생생정보 방송내용',
            url: 'https://bit.ly/2QQDGYF'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '★ 2TV 생생정보 프로그램 정보',
            '★ 2TV 생생정보 방송내용',
            '★ 2TV 생생정보 제보하기',
            '◆ 이전 단계로 (프로그램 + 참여)'
          ]
        }
      }
    },
    {
      hook: '★ 2TV 생생정보 제보하기',
      res: {
        message: {
          text: '★ 2TV 생생정보 제보하기',
          message_button: {
            label: '2TV 생생정보 제보하기',
            url: 'https://bit.ly/2PykO08'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '★ 2TV 생생정보 프로그램 정보',
            '★ 2TV 생생정보 방송내용',
            '★ 2TV 생생정보 제보하기',
            '◆ 이전 단계로 (프로그램 + 참여)'
          ]
        }
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
            '◆ 이전 단계로 (프로그램 + 참여)'
          ]
        }
      }
    },
    {
      hook: '◆ 이전 단계로 (아나운서/기상캐스터)',
      res: {
        message: {
          text: '감사합니다. 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.'
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 아나운서',
            '◇ 기상캐스터',
            '◆ 이전 단계로 (프로그램 + 참여)'
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
            url: serverUrl + '/img/4_announcer.png',
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
            '◆ 이전 단계로 (아나운서/기상캐스터)'
          ]
        }
      }
    },
    {
      hook: '◇ 김평래 아나운서',
      res: {
        message: {
          text: '◇ 김평래 아나운서 프로필',
          message_button: {
            label: '◇ 김평래 아나운서',
            url: 'https://bit.ly/2N9XsvO'
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
            '◆ 이전 단계로 (아나운서/기상캐스터)'
          ]
        }
      }
    },
    {
      hook: '◇ 차경애 아나운서',
      res: {
        message: {
          text: '◇ 차경애 아나운서 프로필',
          message_button: {
            label: '◇ 차경애 아나운서',
            url: 'https://bit.ly/2DJwrjl'
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
            '◆ 이전 단계로 (아나운서/기상캐스터)'
          ]
        }
      }
    },
    {
      hook: '◇ 장현순 아나운서',
      res: {
        message: {
          text: '◇ 장현순 아나운서 프로필',
          message_button: {
            label: '◇ 장현순 아나운서',
            url: 'https://bit.ly/2NOqOoJ'
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
            '◆ 이전 단계로 (아나운서/기상캐스터)'
          ]
        }
      }
    },
    {
      hook: '◇ 김동환 아나운서',
      res: {
        message: {
          text: '◇ 김동환 아나운서 프로필',
          message_button: {
            label: '◇ 김동환 아나운서',
            url: 'https://bit.ly/2zG39Ox'
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
            '◆ 이전 단계로 (아나운서/기상캐스터)'
          ]
        }
      }
    },
    {
      hook: '◇ 차재환 아나운서',
      res: {
        message: {
          text: '◇ 차재환 아나운서 프로필',
          message_button: {
            label: '◇ 차재환 아나운서',
            url: 'https://bit.ly/2xMJhbl'
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
            '◆ 이전 단계로 (아나운서/기상캐스터)'
          ]
        }
      }
    },
    {
      hook: '◇ 이지현 아나운서',
      res: {
        message: {
          text: '◇ 이지현 아나운서 프로필',
          message_button: {
            label: '◇ 이지현 아나운서',
            url: 'https://bit.ly/2OZHJ4e'
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
            '◆ 이전 단계로 (아나운서/기상캐스터)'
          ]
        }
      }
    },
    {
      hook: '◇ 최현호 아나운서',
      res: {
        message: {
          text: '◇ 최현호 아나운서 프로필',
          message_button: {
            label: '◇ 최현호 아나운서',
            url: 'https://bit.ly/2QlVx9z'
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
            '◆ 이전 단계로 (아나운서/기상캐스터)'
          ]
        }
      }
    },
    {
      hook: '★ KBS본사 아나운서',
      res: {
        message: {
          text: '★ KBS본사 아나운서 프로필 정보',
          message_button: {
            label: '★ KBS본사 아나운서',
            url: 'https://bit.ly/2zGalug'
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
            '◆ 이전 단계로 (아나운서/기상캐스터)'
          ]
        }
      }
    },
    {
      hook: '◇ 기상캐스터',
      res: {
        message: {
          text: '[ 기상캐스터 프로필 ]을 원하시면, 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.',
          photo: {
            url: serverUrl + '/img/5_weather.png',
            width: 640,
            height: 480
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 홍나실 기상캐스터',
            '★ KBS본사 기상캐스터',
            '◆ 이전 단계로 (아나운서/기상캐스터)'
          ]
        }
      }
    },
    {
      hook: '◇ 홍나실 기상캐스터',
      res: {
        message: {
          text: '◇ 홍나실 기상캐스터 프로필',
          message_button: {
            label: '◇ 홍나실 기상캐스터',
            url: 'https://bit.ly/2Ebq093'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 홍나실 기상캐스터',
            '★ KBS본사  기상캐스터',
            '◆ 이전 단계로 (아나운서/기상캐스터)'
          ]
        }
      }
    },
    {
      hook: '★ KBS본사 기상캐스터',
      res: {
        message: {
          text: '★ KBS본사 기상캐스터 프로필 정보',
          message_button: {
            label: '★ KBS본사 기상캐스터',
            url: 'https://bit.ly/2CBHUjG'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 홍나실 기상캐스터',
            '★ KBS본사  기상캐스터',
            '◆ 이전 단계로 (아나운서/기상캐스터)'
          ]
        }
      }
    },
    {
      hook: '◇ On-Air 실시간 방송',
      res: {
        message: {
          text: '[ 실시간방송 ]을 원하시면, 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.',
          photo: {
            url: serverUrl + '/img/6_live.png',
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
            '◆ 이전 단계로 (서비스메뉴)'
          ]
        }
      }
    },
    {
      hook: '◆ 이전 단계로 (실시간방송)',
      res: {
        message: {
          text: '감사합니다. 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.',
          photo: {
            url: serverUrl + '/img/6_live.png',
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
            '◆ 이전 단계로 (서비스메뉴)'
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
            '◆ 이전 단계로 (실시간방송)'
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
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 1TV',
            '◇ 2TV',
            '◆ 이전 단계로 (실시간방송)'
          ]
        }
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
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 1TV',
            '◇ 2TV',
            '◆ 이전 단계로 (실시간방송)'
          ]
        }
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
            '◆ 이전 단계로 (실시간방송)'
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
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 1 Radio',
            '◇ 2 Radio',
            '◆ 이전 단계로 (실시간방송)'
          ]
        }
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
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 1 Radio',
            '◇ 2 Radio',
            '◆ 이전 단계로 (실시간방송)'
          ]
        }
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
            '◆ 이전 단계로 (실시간방송)'
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
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 독도 실시간방송',
            '◇ KBS24 News',
            '◇ Facebook KBS',
            '◇ Utube KBS',
            '◆ 이전 단계로 (실시간방송)'
          ]
        }
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
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 독도 실시간방송',
            '◇ KBS24 News',
            '◇ Facebook KBS',
            '◇ Utube KBS',
            '◆ 이전 단계로 (실시간방송)'
          ]
        }
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
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 독도 실시간방송',
            '◇ KBS24 News',
            '◇ Facebook KBS',
            '◇ Utube KBS',
            '◆ 이전 단계로 (실시간방송)'
          ]
        }
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
            '◆ 이전 단계로 (실시간방송)'
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
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 1TV Utube',
            '◇ KBS부산 보이는 라디오 Utube',
            '◇ KBS부산 광안대교 Utube',
            '◆ 이전 단계로 (실시간방송)'
          ]
        }
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
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 1TV Utube',
            '◇ KBS부산 보이는 라디오 Utube',
            '◇ KBS부산 광안대교 Utube',
            '◆ 이전 단계로 (실시간방송)'
          ]
        }
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
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 1TV Utube',
            '◇ KBS부산 보이는 라디오 Utube',
            '◇ KBS부산 광안대교 Utube',
            '◆ 이전 단계로 (실시간방송)'
          ]
        }
      }
    },
    {
      hook: '◇ KBS부산 소개 + 사보',
      res: {
        message: {
          text: '[ KBS부산 안내 ]를 원하시면, 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.',
          photo: {
            url: serverUrl + '/img/7_kbs_busan.png',
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
            '◆ 이전 단계로 (서비스메뉴)'
          ]
        }
      }
    },
    {
      hook: '◆ 이전 단계로 (KBS부산)',
      res: {
        message: {
          text: '[ KBS부산 안내 ]를 원하시면, 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.',
          photo: {
            url: serverUrl + '/img/7_kbs_busan.png',
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
            '◆ 이전 단계로 (서비스메뉴)'
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
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ KBS부산 소개',
            '◇ KBS부산 연락처',
            '◇ KBS사보',
            '◆ 이전 단계로 (KBS부산)'
          ]
        }
      }
    },
    {
      hook: '◇ KBS부산 연락처',
      res: {
        message: {
          text: '◇ KBS부산 연락처',
          photo: {
            url: serverUrl + '/img/group_call.png',
            width: 480,
            height: 640
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ KBS부산 소개',
            '◇ KBS부산 연락처',
            '◇ KBS사보',
            '◆ 이전 단계로 (KBS부산)'
          ]
        }
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
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ KBS부산 소개',
            '◇ KBS부산 연락처',
            '◇ KBS사보',
            '◆ 이전 단계로 (KBS부산)'
          ]
        }
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
            '◆ 이전 단계로 (서비스메뉴)'
          ]
        }
      }
    },
    {
      hook: '◆ 이전 단계로 (수신료/시청자권익센터)',
      res: {
        message: {
          text: '감사합니다. 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.'
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 수신료',
            '◇ 시청자권익센터',
            '◆ 이전 단계로 (서비스메뉴)'
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
            '◆ 이전 단계로 (수신료/시청자권익센터)'
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
            '◆ 이전 단계로 (수신료/시청자권익센터)'
          ]
        }
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
            '◆ 이전 단계로 (수신료/시청자권익센터)'
          ]
        }
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
            '◆ 이전 단계로 (수신료/시청자권익센터)'
          ]
        }
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
            '◆ 이전 단계로 (수신료/시청자권익센터)'
          ]
        }
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
            '◆ 이전 단계로 (수신료/시청자권익센터)'
          ]
        }
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
            '◆ 이전 단계로 (수신료/시청자권익센터)'
          ]
        }
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
            '◆ 이전 단계로 (수신료/시청자권익센터)'
          ]
        }
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
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 수신료',
            '◇ 시청자권익센터',
            '◆ 이전 단계로 (서비스메뉴)'
          ]
        }
      }
    },
    {
      hook: '◇ 부산홀 공연 + 문화 행사',
      res: {
        message: {
          text: '[ KBS부산 홀/문화행사 ]를 원하시면, 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.',
          photo: {
            url: serverUrl + '/img/8_busan_hall.png',
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
            '◆ 이전 단계로 (서비스메뉴)'
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
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ KBS부산 홀 공연 일정',
            '◇ KBS부산 홀 좌석배치도',
            '◇ KBS부산 갤러리 안내',
            '◇ 문화행사',
            '◆ 이전 단계로 (서비스메뉴)'
          ]
        }
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
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ KBS부산 홀 공연 일정',
            '◇ KBS부산 홀 좌석배치도',
            '◇ KBS부산 갤러리 안내',
            '◇ 문화행사',
            '◆ 이전 단계로 (서비스메뉴)'
          ]
        }
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
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ KBS부산 홀 공연 일정',
            '◇ KBS부산 홀 좌석배치도',
            '◇ KBS부산 갤러리 안내',
            '◇ 문화행사',
            '◆ 이전 단계로 (서비스메뉴)'
          ]
        }
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
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ KBS부산 홀 공연 일정',
            '◇ KBS부산 홀 좌석배치도',
            '◇ KBS부산 갤러리 안내',
            '◇ 문화행사',
            '◆ 이전 단계로 (서비스메뉴)'
          ]
        }
      }
    },
    {
      hook: '◇ 견학 + 광고',
      res: {
        message: {
          text: '[ 견학/광고 ]를 원하시면, 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.',
          photo: {
            url: serverUrl + '/img/9_excursion.png',
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
            '◆ 이전 단계로 (서비스메뉴)'
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
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ KBS부산 견학',
            '◇ KBS본사 서울 견학',
            '◇ KBS부산 광고 안내',
            '◆ 이전 단계로 (서비스메뉴)'
          ]
        }
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
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ KBS부산 견학',
            '◇ KBS본사 서울 견학',
            '◇ KBS부산 광고 안내',
            '◆ 이전 단계로 (서비스메뉴)'
          ]
        }
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
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ KBS부산 견학',
            '◇ KBS본사 서울 견학',
            '◇ KBS부산 광고 안내',
            '◆ 이전 단계로 (서비스메뉴)'
          ]
        }
      }
    },
    {
      hook: '◇ 부산 날씨 + 교통',
      res: {
        message: {
          text: '[ 날씨/교통 ]를 원하시면, 아래의 메뉴 중에서 확인하시려는 [ 버튼 ]을 선택해주세요.',
          photo: {
            url: serverUrl + '/img/10_weather.png',
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
            '◆ 이전 단계로 (서비스메뉴)'
          ]
        }
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
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 부산 날씨정보',
            '◇ 미세먼지정보',
            '◇ 교통정보',
            '◇ 버스정보',
            '◇ 도시철도정보',
            '◆ 이전 단계로 (서비스메뉴)'
          ]
        }
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
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 부산 날씨정보',
            '◇ 미세먼지정보',
            '◇ 교통정보',
            '◇ 버스정보',
            '◇ 도시철도정보',
            '◆ 이전 단계로 (서비스메뉴)'
          ]
        }
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
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 부산 날씨정보',
            '◇ 미세먼지정보',
            '◇ 교통정보',
            '◇ 버스정보',
            '◇ 도시철도정보',
            '◆ 이전 단계로 (서비스메뉴)'
          ]
        }
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
    {
      hook: config.get('password'),
      res: {
        message: {
          text: '반갑습니다.'
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 식단표',
            '◇ 편성표',
            '◆ 이전 단계로 (서비스메뉴)'
          ]
        }
      }
    },
    {
      hook: '◇ 식단표',
      res: {
        message: {
          text: '◇ 식단표',
          message_button: {
            label: '식단표 확인하기',
            url: 'https://bit.ly/2yBNn5v'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 식단표',
            '◇ 편성표',
            '◆ 이전 단계로 (서비스메뉴)'
          ]
        }
      }
    },
    {
      hook: '◇ 편성표',
      res: {
        message: {
          text: '◇ 편성표',
          message_button: {
            label: '편성표 확인하기',
            url: 'https://bit.ly/2yBNn5v'
          }
        },
        keyboard: {
          type: 'buttons',
          buttons: [
            '◇ 식단표',
            '◇ 편성표',
            '◆ 이전 단계로 (서비스메뉴)'
          ]
        }
      }
    }
  ]

  exports.start = startButton
  exports.main = mainButton
  exports.fallback = fallback_text
  exports.datas = datas

  console.log(('Server url: ' + serverUrl).bgGreen.black)
})