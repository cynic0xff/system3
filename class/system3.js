const csv = require('csv-parser');
const fs = require('fs');
const mysql = require('mysql');
const chalk = require('chalk');
const logSymbols = require('log-symbols');

class System3 {
    constructor(srcFile) {
        //source file
        this.srcFile = srcFile;

        //sqlQuery
        this.sqlQuery = 'select * from wp_users';

        //destination database headers
        this.destHeaderArray = [
            "DealerID","StockNumber","VIN","Year","Make","Model","TrimLevel","Condition","ExteriorColor","InteriorColor","EngineDescription","Transmission","DriveTrain",
            "NumberofDoors","vehicleType","InventorySince","AgeInDays","InServiceDate","Mileage","StickerPrice","InternetPrice","InvoicePrice","MSRPPrice","ThirdPartyPrice",
            "InternetSpecial","DealerCertified","OEMCertified","CertificationNumber","LotLocation","Balance","VehicleDescription","ThirdPartyDescription","ShowroomTitle",
            "Memo","PictureURLs","Options","OptionCodes","InStock","VideoLink","3rdPartyVideoLink","CityMPG","HighwayMPG","RVType","Length","WaterCapacity","SlideOuts",
            "SleepingCapacity","FuelType","AirConditioners","Awnings","LevelingJacks","DryWeight","TrailerWeight","Chassis","EngineManufacturer","EngineModel"
        ];

        //the array of vehicle information
        this.data = [];
    }

    run() {
        fs.createReadStream(this.srcFile)
        .pipe(csv())
        .on('data', (row) => {
            this.process(row);
        })
        .on('end', () => {
            console.log('CSV file successfully processed');
        });
    }

    process(row) {
        console.log(`processing ...`);// + row["DealerID"] + ' ' + row['StockNumber'] + ' ' + row['Year'] + ' ' + row['Model']);
        this.update(row);
    }

    connectToMySql() {

        //set the database credentials
        let connection = mysql.createConnection({
            host     : 'dev.local',
            user     : 'root',
            password : 'wordpress',
            database : 'wordpress'
          });

          //connect to our database
          connection.connect((err) => {

            //if we have an error
            if(err) {

                console.error();
                console.error(logSymbols.error, chalk.red(`Error connecting to ${connection.config.database} with user ${connection.config.user}`));
                console.error();
                console.error(`Suggestions:`);
                console.error(`> Username and password and correct.`);
                console.error(`> Database exists`);
                console.error(`> The SQL server is up and running`);
                console.error(`> The user has permission to connect remotely.`);
                console.error(`> You may need to run the following on the SQL server`);
                console.error(`  GRANT ALL PRIVILEGES ON *.* TO 'USERNAME'@'%' IDENTIFIED BY 'PASSWORD' WITH GRANT OPTION;`);
                console.error();
                return;
            } 
          });

          //sql query
          this.query(connection, this.sqlQuery);
           
          //terminate the connection
          connection.end((err) => {
              console.log(logSymbols.info, `The connection is terminated`);
          });
    }

    query(connection) {

         /*test connection
         connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
            if (error) throw error;
            console.log('The solution is: ', results[0].solution);
        });*/

        connection.query(this.sqlQuery, (err, results, fields) => {
            if(err) {
                console.error(logSymbols.error, `The query failed`);
                return;
            }

            console.log(results);
        });
    }

    update(row) {
        console.log('Updating row ' + row["DealerID"] + ' ' + row["StockNumber"]);
    }
};

module.exports = System3;
