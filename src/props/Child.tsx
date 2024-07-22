interface ChildProps{
    color: string;
    onClick: ()=>  void,
    children: React.ReactNode;

}

export const Child = ({ color, onClick }: ChildProps ) =>{
    return <div>
        Hi, there!
        <button onClick={onClick}>Click me!</button>
    </div>
}

export const ChildAsFC: React.FC<ChildProps> = ( { color, onClick, children})=>{
  return <div>
          { children }
          { color }
          <button onClick={onClick}>Click me!</button>

  </div>
}


// When using React.FC, the children prop is automatically included.
 // This makes it easy to pass nested elements to the component.

 //Child might have properties assigned to it like 'propTypes' and 'contextTypes'