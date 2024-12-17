interface AvatarProps {
  name: string;
  imageUrl?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Avatar = ({ name, imageUrl, size = 'md' }: AvatarProps) => {
  const getInitial = (name: string) => name.charAt(0).toUpperCase();
  
  // Generate a random pastel color based on the name
  const getRandomColor = (name: string) => {
    const hash = name.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    
    const h = hash % 360;
    return `hsl(${h}, 70%, 80%)`;
  };

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-lg',
    lg: 'w-16 h-16 text-2xl',
  };

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={name}
        className={`${sizeClasses[size]} rounded-full object-cover border-2 border-electric-purple`}
      />
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center font-orbitron text-dark-void border-2 border-electric-purple`}
      style={{ backgroundColor: getRandomColor(name) }}
    >
      {getInitial(name)}
    </div>
  );
};

export default Avatar;