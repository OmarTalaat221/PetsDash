import './style.css';

export default function CustomSubmenuLabel({iconName , text}) {
  return (
    <div className='label'>
        {iconName}
        <span>{text}</span>
    </div>
  )
}
