import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  Tag as TagIcon,
  Globe,
  Lock,
  EyeOff,
  X,
  Sparkles,
  ChevronRight,
  LayoutGrid,
} from "lucide-react";
import api from "../../api";

const CreateGroup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    tags: [],
    visibility: "public",
  });

  const [categories, setCategories] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log(localStorage.getItem("access_token"));
        const response = await api.get("groups/categories/");
        setCategories(response.data);
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        visibility: formData.visibility,
        tags: formData.tags,
      };

      console.log("Sending to backend:", payload);

      await api.post("/groups/", payload);
      navigate("/study-groups");
    } catch (err) {
      if (err.response) {
        console.error("Backend Validation Error:", err.response.data);
      } else {
        console.error("Creation failed", err);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tagToRemove),
    });
  };

  return (
    <div className="min-h-full bg-bg-main">
      <div className="border-b border-[var(--color-tx-main)]/5">
        <div className="max-w-2xl mx-auto px-6 py-6">
          <button
            onClick={() => navigate("/study-groups")}
            className="flex items-center gap-2 text-sm text-tx-muted/70 hover:text-tx-main transition-colors group"
          >
            <ArrowLeft
              size={14}
              className="group-hover:-translate-x-0.5 transition-transform"
            />
            Back
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-primary/10 mb-4">
            <Sparkles size={20} className="text-brand-primary" />
          </div>
          <h1 className="text-2xl font-semibold text-tx-main tracking-tight">
            New Study Group
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Group Name & Category Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-bold text-tx-muted uppercase tracking-widest mb-2">
                Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full py-2 text-base text-tx-main bg-transparent border-b border-tx-main/10 focus:outline-none focus:border-brand-primary transition-all"
                placeholder="e.g. AgriPredict Dev"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-tx-muted uppercase tracking-widest mb-2">
                Category
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full py-2 text-base text-tx-main bg-transparent border-b border-tx-main/10 focus:outline-none focus:border-brand-primary transition-all appearance-none"
              >
                <option value="" disabled>
                  Select Category
                </option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[10px] font-bold text-tx-muted uppercase tracking-widest mb-2">
              Description
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full py-2 text-sm text-tx-main bg-transparent border-b border-tx-main/10 focus:outline-none focus:border-brand-primary transition-all resize-none"
              rows={2}
            />
          </div>

          {/* Visibility Selection */}
          <div>
            <label className="block text-[10px] font-bold text-tx-muted uppercase tracking-widest mb-4">
              Visibility
            </label>
            <div className="grid grid-cols-3 gap-4">
              {[
                { id: "public", icon: Globe, label: "Public" },
                { id: "private", icon: Lock, label: "Private" },
                { id: "hidden", icon: EyeOff, label: "Hidden" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, visibility: item.id })
                  }
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                    formData.visibility === item.id
                      ? "border-brand-primary bg-brand-primary/5 text-brand-primary"
                      : "border-tx-main/5 text-tx-muted hover:bg-tx-main/5"
                  }`}
                >
                  <item.icon size={18} />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tags (Replacing Major/Course) */}
          <div>
            <label className="block text-[10px] font-bold text-tx-muted uppercase tracking-widest mb-2">
              Tags / Topics
            </label>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && (e.preventDefault(), handleAddTag())
              }
              placeholder="Add #CS101, #MajorName, #React..."
              className="w-full py-2 text-sm text-tx-main bg-transparent border-b border-tx-main/10 focus:outline-none focus:border-brand-primary transition-all"
            />
            <div className="flex flex-wrap gap-2 mt-4">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-tx-main/5 text-[11px] text-tx-main font-medium"
                >
                  #{tag}
                  <X
                    size={12}
                    className="cursor-pointer opacity-50 hover:opacity-100"
                    onClick={() => handleRemoveTag(tag)}
                  />
                </span>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting || !formData.name || !formData.category}
            className="w-full py-4 rounded-xl bg-brand-primary text-white font-bold text-sm hover:brightness-110 transition-all disabled:opacity-20 flex items-center justify-center gap-2"
          >
            {isSubmitting ? "Generating Workspace..." : "Create Study Group"}
            <ChevronRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGroup;
