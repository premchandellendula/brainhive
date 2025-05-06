interface ISideBarButtonProps {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void
}

const SidebarButton = (props: ISideBarButtonProps) => {
    const toggleSidebar = () => {
        props.setIsOpen(!props.isOpen)
    }
    return (
        <div className="">
            <button 
                onClick={toggleSidebar} 
                className="p-1.5 lg:hidden block border border-blue-600 bg-blue-100 text-white rounded-md text-xl w-9"
            >
                {props.isOpen ? <span className='text-blue-400 hover:text-blue-600'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-panel-left-close "><rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="M9 3v18"></path><path d="m16 15-3-3 3-3"></path></svg></span> : <span className='text-blue-400 hover:text-blue-600'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-panel-left-open "><rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="M9 3v18"></path><path d="m14 9 3 3-3 3"></path></svg></span>}
            </button>
        </div>
    )
}

export default SidebarButton