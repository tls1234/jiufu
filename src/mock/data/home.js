module.exports = {
  code: 10000,
  message: 'success',
  data: {
    'newStockList|100': [{
      'id|+1': 1,
      name: '腾讯控股',
      type: 'HK',
      code: '@integer(10000, 70000)',
      newPrice: '@float(260, 500, 2, 2)',
      rate: '@float(80, 200, 2, 2)',
      firstRate: '@float(80, 100, 2, 2)'
    }],
    'faqList|10': [{
      'id|+1': 1,
      'qs': '@csentence',
      'as': '@cparagraph'
    }],
    'slideList|7': [{
      'adId|+1': 1,
      img: '@image(560x290, "#02adea", "Hello")',
      desc: '@csentence',
      posCode: '@integer(1000,1999)',
      url: '@url',
      isNeedHeader: true,
      bottomTab: true,
      subTag: '认购进行中'
    }]
  }
}
