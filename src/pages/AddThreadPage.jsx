import { useState } from "react";
import { useDispatch } from "react-redux";
import { asyncAddThread } from "../states/threads/action";
import { useNavigate } from "react-router-dom";

function AddThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");

  async function onSubmit(e) {
    e.preventDefault();

    if (!title || !body || !category) {
      alert("Semua field wajib diisi!");
      return;
    }

    try {
      await dispatch(asyncAddThread({ title, body, category }));
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Buat Thread Baru
          </h2>

          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            {/* TITLE */}
            <div>
              <label className="text-sm text-gray-600">Judul</label>
              <input
                type="text"
                placeholder="Masukkan judul..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* CATEGORY */}
            <div>
              <label className="text-sm text-gray-600">Kategori</label>
              <input
                type="text"
                placeholder="Contoh: react, javascript"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* BODY */}
            <div>
              <label className="text-sm text-gray-600">Isi Thread</label>
              <textarea
                rows="5"
                placeholder="Tulis isi thread..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Kirim Thread
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddThreadPage;
