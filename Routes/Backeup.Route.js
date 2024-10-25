const express=require('express')
const router=express.Router()
const asyncHandler=require('express-async-handler')
const {exec}=require('child_process')
const { stdout, stderr } = require('process')
router.post('/backup',asyncHandler(async(req,res)=>{
    const backupFile=`backup-${new Date().toISOString().slice(0,10)}.gz`
    const command=`mongodump --db Content Management System --archive=./backups/${backupFile} --gzip`
    exec(command,(error,stdout,stderr)=>{
        if(error)
        {
            console.error(`backup failed:${error.message}`)
            console.error(`stderr: ${stderr}`);
          return res.status(500).json("backup failed")
        }
        console.log(`stdout: ${stdout}`);
        console.log("backup successfull",backupFile)
        res.status(200).json("Backup done")
    })
}))
router.post('/restore', async (req, res) => {
    const { backupFile } = req.body;
    const command = `mongorestore --db your_database_name --archive=./backups/${backupFile} --gzip --drop`;
  
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Restore failed: ${error.message}`);
        return res.status(500).send('Restore failed.');
      }
      console.log('Restore completed successfully from:', backupFile);
      res.status(200).send('Restore completed successfully.');
    });
  });
  
module.exports=router