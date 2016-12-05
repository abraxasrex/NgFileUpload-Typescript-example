namespace imdbcrud.Controllers {

    export class AboutController {
        public message = 'Hello from the about page!';
    }

    export class HomeController {
       public f;
       public errFile;
       public errorMsg
       constructor(
         private Upload: ng.angularFileUpload.IUploadService,
         private $timeout: ng.ITimeoutService){}

       public uploadFiles(file: any, errFiles) {
         this.f = file;
         this.errFile = errFiles && errFiles[0];
         let _this = this;
         if (file) {
           // 1. configure upload method for the file
             file.upload = _this.Upload.upload({
                 url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                 data: {file: file}
             });
             // 2. chain a promise to execute when file is done
             file.upload.then(function (response) {
                 _this.$timeout(function () {
                     file.result = response.data;
                 });
             }, function (response) {
               // 3. handle errors
                 if (response.status > 0)
                     _this.errorMsg = response.status + ': ' + response.data;
             });
         }
       }
    }

}
