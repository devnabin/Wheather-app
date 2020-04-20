let address='';
init();

//In ${body.timezone} The current temperature is ${body.current.temp} and The weather is ${body.current.weather[0].description}`
function init(){
    document.querySelector('.addressp').textContent= ''
    document.querySelector('.weatherp').textContent= ''
    address = ''
}


document.querySelector('button').addEventListener('click',()=>{
    init();
    document.querySelector('.addressp').textContent= 'Loading ...'
    address =  document.querySelector('input').value;
     if(address){
        getdata(address).then(obj=>{
            document.querySelector('.addressp').textContent=  obj.address 
            document.querySelector('.weatherp').textContent= ` In ${obj.address} The current temperature is ${obj.temperature} and The weather is ${obj.sky} !`
        })
     }else{
        document.querySelector('.weatherp').textContent= 'Please Provide a valid address'

     }
   
})
async function getdata(address){
  let val = await fetch(`/weather?search=${address}`)
  val = await val.json();
  return val
}
