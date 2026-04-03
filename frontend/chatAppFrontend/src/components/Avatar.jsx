const COLORS = [
    "hsl(330, 65%, 50%)",  // pink
    "hsl(200, 65%, 40%)",  // dark blue
    "hsl(25, 65%, 50%)",   // orange
    "hsl(150, 65%, 35%)",  // dark green
    "hsl(270, 65%, 50%)",  // purple
    "hsl(0, 65%, 45%)",    // dark red
    "hsl(180, 65%, 35%)",  // teal
    "hsl(45, 65%, 45%)",   // dark yellow
]

const getColor = (id) => {
    if (!id) return COLORS[0]
    const num = id.split('').reduce((acc, char) => {
        return acc + char.charCodeAt(0)
    }, 0)
    return COLORS[num % COLORS.length]
}

const getInitials = (name) => {
  return name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

const Avatar = ({ id, name, size = "w-12 h-12", online = false }) => {
  return (
    <div className="relative">
      <div
        style={{ backgroundColor: getColor(id) }}
        className={`${size} rounded-full flex items-center justify-center text-white font-bold text-lg`}
      >
        {getInitials(name)}
      </div>

      {/* 🟢 Online dot */}
      {online && (
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
      )}
    </div>
  )
}

export default Avatar