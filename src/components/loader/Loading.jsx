import "./Loading.css"
import pic from "../../images/loderIcon.gif";

function Loading() {
  return (
    <div className='loadingMain'>
      <img src={pic} alt='Loading....' />
    </div>
  )
}

export default Loading