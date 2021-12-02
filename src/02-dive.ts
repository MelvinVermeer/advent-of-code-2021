const START_POSITION = {
  aim: 0,
  depth: 0,
  horizontal: 0,
};

const dive = ({ horizontal, depth }: any, command: string) => {
  const [direction, steps] = command.split(" ");

  switch (direction) {
    case "up":
      return {
        depth: depth - Number(steps),
        horizontal,
      };
    case "down":
      return {
        depth: depth + Number(steps),
        horizontal,
      };
    case "forward":
      return {
        depth,
        horizontal: horizontal + Number(steps),
      };
  }

  return { horizontal, depth };
};

const diveWithAim = ({ horizontal, depth, aim }: any, command: string) => {
  const [direction, steps] = command.split(" ");

  switch (direction) {
    case "up":
      return {
        aim: aim - Number(steps),
        depth,
        horizontal,
      };
    case "down":
      return {
        aim: aim + Number(steps),
        depth,
        horizontal,
      };
    case "forward":
      return {
        aim,
        depth: depth + aim * Number(steps),
        horizontal: horizontal + Number(steps),
      };
  }

  return { horizontal, depth, aim };
};

export const followCommands = (commands: string[], useAim = false) => {
  const algorithm = useAim ? diveWithAim : dive;

  const { depth, horizontal } = commands.reduce(algorithm, START_POSITION);

  return depth * horizontal;
};
