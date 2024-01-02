var express = require('express');
const authenticateToken = require('../middleware/token');
var router = express.Router();
var checksum = require('../model/checksum');
var paytmconfig = require('../model/paytmconfig');
var crypto = require('crypto')


/* GET home page. */


router.post('/paymentchksm', function (req, res, next) {
    console.log("body: ", req.body);
    var params = req.body;
  
    var params = {};
    // params['MID'] = 'ChiefE15086623703268';
    // params['WEBSITE'] = 'ChiefE';
    // params['CHANNEL_ID'] = 'WEB';
    // params['INDUSTRY_TYPE_ID'] = 'Retail105';
    // params['ORDER_ID'] = 'TEST_'  + new Date().getTime();
    // params['CUST_ID'] = 'PSR-RRF-GRJ12';
    // params['TXN_AMOUNT'] = '7000';
    // params['CALLBACK_URL'] = 'http://localhost:3000/verifychksm';
    // params['EMAIL'] = 'snikalje302@gmail.com';
    // params['MOBILE_NO'] = '9768111420';

    // ahsan paytm testing credential

    params['MID'] = 'WfdGkW45506781124081';
    params['WEBSITE'] = 'WEBSTAGING';
    params['CHANNEL_ID'] = 'WEB';
    params['INDUSTRY_TYPE_ID'] = 'Retail';
    params['ORDER_ID'] = 'TEST_'  + new Date().getTime();
    params['CUST_ID'] = 'PSR-RRF-GRJ13';
    params['TXN_AMOUNT'] = '1';
    params['CALLBACK_URL'] = 'http://localhost:3000/verifychksm';
    params['EMAIL'] = 'snikalje302@gmail.com';
    params['MOBILE_NO'] = '9768111420';


    // var paramsData = req.body;
    // var params = {};
    // params['MID'] = process.env.MID;
    // params['WEBSITE'] =  process.env.WEBSITE;
    // params['CHANNEL_ID'] = process.env.CHANNEL_ID;
    // params['INDUSTRY_TYPE_ID'] = process.env.INDUSTRY_TYPE_ID;
    // params['ORDER_ID'] = paramsData.txnId;
    // params['CUST_ID'] = paramsData.customerId;
    // params['TXN_AMOUNT'] = paramsData.amount.toString();
    // params['CALLBACK_URL'] = process.env.CALL_Back_Paytm;
    // params['EMAIL'] = paramsData.email;
    // params['MOBILE_NO'] = paramsData.phone;

    // checksum.genchecksum(params, process.env.PAYTM_MERCHANT_KEY, function (err, result) {
    //   if(err)console.log(err)
    //   // console.log('data',result)
    //   res.json(result);
  
    // });

    // ahsan testing api
    
    checksum.genchecksum(params, process.env.TESTING_MERCHANT_KEY, function (err, result) {
      if(err)console.log(err)
      // console.log('data',result)
      res.json(result);
    });
  });

  router.post('/verifychksm',(req, res)=>{
      var paramlist = req.body;
      console.log(paramlist)

    if (checksum.verifychecksum(paramlist, paytmconfig.PAYTM_MERCHANT_KEY)) {
        // if (paramlist.STATUS == 'TXN_SUCCESS') {
        //   // res.render('payment', {
        //   //   message: "Your payment is successful.",
        //   //   // link: process.env.HOST_API + '/paymentsuccess?paymentId=' + paramlist.TXNID + '\&bankRef=' + paramlist.BANKTXNID + '\&txnAmt=' + paramlist.TXNAMOUNT + '\&txnId=' + paramlist.ORDERID
        //   // });
        // } else {
        //   res.render('failure', {
        //     message: "Payment is unsuccessful.",
        //     // link: process.env.HOST_API + '/paymentfailed?paymentId='+paramlist.TXNID
        //   });
        // }
      } else {
        console.log('error')
        // res.render('failure', {
        //   message: "Payment is unsuccessful. Checksum Error.",
        // //   link: process.env.HOST_API + '/paymentfailed?paymentId='+paramlist.TXNID
        // });
      };
  })


module.exports = router;
