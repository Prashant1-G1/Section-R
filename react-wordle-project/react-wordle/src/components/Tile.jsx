export default function Tile({ letter = "", status = "", active = false }) {
  const classes = ["tile"];
  if (status) classes.push(status);
  if (active && letter) classes.push("filled");
  if (active) classes.push("active");

  return <div className={classes.join(" ")} aria-label={letter || "empty"}>
    {letter}
  </div>;
}
