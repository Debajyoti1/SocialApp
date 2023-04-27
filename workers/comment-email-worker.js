const queue=require('../configs/kue')

queue.process('emails',(job,done)=>{
    console.log('email worker is processing');
    done()
})