export default function project() {
  const projectColor = "#5DADE2";
  const CompanyName = "Lapisha Rentals";
  const nav_item_font = "tangerine"; //labelle //pacifico
  const background_color = "#eee";
  const check_width = () => {
    if (window.screen.availWidth < 500) {
      return true;
    }
    return false;
  };
  return {
    projectColor: projectColor,
    companyName: CompanyName,
    nav_item_font: nav_item_font,
    background_color: background_color,
    check_width: check_width(),
  };
}
