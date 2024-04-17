import p1 from "../../assets/todo/andaman.jpg";
import p2 from "../../assets/todo/kerela.jpg";
import p3 from "../../assets/todo/lakshadweep.jpg";
import p4 from "../../assets/todo/leh.jpg";
import p5 from "../../assets/todo/goa.jpg";
import p6 from "../../assets/todo/kashmir.jpg";

const Todo = () => {
  const cities = ["Punjab", "Punjab", "Punjab", "Punjab", "Punjab", "Punjab"];
  const imgs = [p1, p2, p3, p4, p5, p6];
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
  {cities.map((c, ind) => (
    <div key={c} className="w-[15%]">
      <div className="max-w-xs rounded overflow-hidden shadow-lg">
        <img src={imgs[ind]} alt={c} className="w-full h-48 object-cover" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{c}</div>
        </div>
      </div>
    </div>
  ))}
</div>

  );
};

export default Todo;
