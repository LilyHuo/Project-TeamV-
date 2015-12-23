/*
 * GET main page.
 */

exports.index = function(req, res, next){
  res.render('index', { title: 'Tweet visualization', criteria:'Sentiment' });
};
exports.login = function(req, res, next){
  res.render('login', { title: 'Tweet visualization', criteria:'Sentiment' });
};
exports.signup = function(req, res, next){
  res.render('signup', { title: 'Tweet visualization', criteria:'Sentiment' });
};
exports.destination = function(req, res, next){
  res.render('destination', { title: 'Tweet visualization', criteria:'Sentiment' });
};
exports.range = function(req, res, next){
  res.render('range', { title: 'Tweet visualization', criteria:'Sentiment' });
};
exports.file = function(req, res, next){
  res.render('file', { title: 'Tweet visualization', criteria:'Sentiment' });
};
