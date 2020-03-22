//Database Connection Establishment
exports.execQuery = function (ConPool,Qry,cntxtDtls,callback){
      ConPool.getConnection(function(err, connection) { 
            if (err) { console.log(err); callback(err, null); return err;  }     
            
            connection.query( Qry, function(err, rows) {
                  connection.release(); 
                  if(err) { console.log(err); callback(true, null); return; }      
                  callback(false, rows);
                  return ;     
            });
      });
};