
import './App.css';
import React, {useEffect, useState} from "react";
import { Meme } from './component/meme';

const objectToQueryParam =(obj)=>{
  const params = Object.entries(obj).map(([key,value])=>`${key}=${value}`)
 return '?' + params.join('&')
}
function App() {
  const [templates,setTemplates] = useState([]);
  const [template,setTemplate] = useState(null);
  const [topText,setTopText] = useState('');
  const [bottomText,setbottomText] = useState('');
  const [meme,setMeme] = useState(null);



useEffect(()=>{
 fetch('https://api.imgflip.com/get_memes').then(x =>x.json().then
 (response =>setTemplates(response.data.memes)));
},[]);


if (meme){
 return (
 <div style={{textAlign:'center'}}>
   <img style={{width:'200px'}} src={meme} alt="custom meme" />
 </div>)
}
  return (  
   
   <div style ={{textAlign:"center"}}>
     <h1>MEME GENERATOR</h1>
     {/* <h3>Pick a template to create meme</h3> */}
     {template && 

     <>
     {/* getting meme after choosing a meme */}
     <Meme template={template} />
     <form onSubmit={async e =>{
       e.preventDefault()
      //  this is going to add meme 
      const params ={
        template_id:template.id,
        text0:topText,
        text1:bottomText,
        username:'aditi1234',
        password:'aditi1234'
      }
       const response = await fetch(`https://api.imgflip.com/caption_image${objectToQueryParam(
         params
         
         )}`
         );
          const json = await response.json()
         setMeme(json.data.url)
     }}>
     <input className="input" type="text" placeholder='top text' value={topText} onChange={e=>setTopText(e.target.value)} />
     <input  className="input" type="text" placeholder='bottom text'value={bottomText} onChange={e=>setbottomText(e.target.value)} />
     <button className="submit" type="submit">Create Meme</button>
     </form>
     </>
     }

     {/* getting all the memes shown from meme component */}

     {!template && 
     (
       <>
       <h3>Pick a template to create meme</h3>
       {templates.map(template =>{
       return(
         <Meme 
         template={template}
          onClick ={()=>{
            setTemplate(template)
          }} />
       )
     })}</>)}
     </div>
  ); 
}

export default App;
