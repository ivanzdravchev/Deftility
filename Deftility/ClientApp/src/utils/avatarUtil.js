function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function getInitials(name) {
  name = name.toUpperCase();
  if (name.split(' ').length > 1) {
    return `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`;
  } else {
    return `${name.split(' ')[0][0]}`;
  }
}

export function stringToAvatarProps(name, width = 40, height = 40) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width,
      height
    },
    children: getInitials(name),
  };
}
