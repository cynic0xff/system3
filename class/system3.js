const csv = require('csv-parser');
const fs = require('fs');
const Config = require('./config.js')

class System3 {
    constructor(srcFile) {
        //source file
        this.srcFile = srcFile;

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
        console.log(this.destHeaderArray);
    }
};

module.exports = System3;
