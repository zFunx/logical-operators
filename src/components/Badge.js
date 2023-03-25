const Badge = ({ text, isTrue }) => {
    return (
        <div className={`text-xs px-3 py-1 ${isTrue ? 'bg-green-500' : 'bg-red-500'} rounded-full`}>{text}</div>
    )
}

export default Badge