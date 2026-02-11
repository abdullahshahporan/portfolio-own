import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiLockClosed, HiUser, HiCode, HiCollection, HiAcademicCap, HiCog, HiLogout, HiPlus, HiTrash, HiSave, HiRefresh, HiChevronUp, HiChevronDown } from 'react-icons/hi';
import { usePortfolioData } from '../context/DataContext';
import toast from 'react-hot-toast';

const tabs = [
  { id: 'personal', label: 'Personal Info', icon: HiUser },
  { id: 'about', label: 'About & Services', icon: HiCode },
  { id: 'skills', label: 'Skills', icon: HiCog },
  { id: 'projects', label: 'Projects', icon: HiCollection },
  { id: 'education', label: 'Education & Exp', icon: HiAcademicCap },
  { id: 'settings', label: 'Settings', icon: HiCog },
];

export default function Admin() {
  const { data, updateData, updateNestedData, updateAndSave, isAuthenticated, login, logout, resetData } = usePortfolioData();
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('personal');
  const [loggingIn, setLoggingIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    try {
      const success = await login(password);
      if (success) {
        toast.success('Welcome to Admin Panel!');
      } else {
        toast.error('Invalid password!');
      }
    } catch (err) {
      toast.error('Server error — check Vercel env variables');
    }
    setPassword('');
    setLoggingIn(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center shadow-lg shadow-primary-500/25">
              <HiLockClosed size={28} className="text-white" />
            </div>
            <h1 className="text-2xl font-display font-bold text-white">Admin Panel</h1>
            <p className="text-gray-400 text-sm mt-2">Enter your password to manage your portfolio</p>
          </div>

          <form onSubmit={handleLogin} className="p-6 bg-dark-100/50 border border-white/10 rounded-2xl space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-dark/50 border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 transition-all"
                placeholder="Enter admin password"
                autoFocus
              />
            </div>
            <button
              type="submit"
              disabled={loggingIn}
              className="w-full px-6 py-3 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-500 hover:to-purple-500 text-white font-medium rounded-xl shadow-lg shadow-primary-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loggingIn ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-10 px-4">

      <div className="max-w-7xl mx-auto">
        {/* Admin Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-display font-bold text-white">Dashboard</h1>
            <p className="text-sm text-gray-400">Manage your portfolio content</p>
          </div>
          <button
            onClick={() => { logout(); toast.success('Logged out'); }}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-all"
          >
            <HiLogout size={16} /> Logout
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-56 flex-shrink-0">
            <div className="bg-dark-100/50 border border-white/5 rounded-2xl p-2 flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'personal' && <PersonalTab data={data} updateAndSave={updateAndSave} />}
                {activeTab === 'about' && <AboutTab data={data} updateAndSave={updateAndSave} />}
                {activeTab === 'skills' && <SkillsTab data={data} updateAndSave={updateAndSave} />}
                {activeTab === 'projects' && <ProjectsTab data={data} updateAndSave={updateAndSave} />}
                {activeTab === 'education' && <EducationTab data={data} updateAndSave={updateAndSave} />}
                {activeTab === 'settings' && <SettingsTab data={data} updateAndSave={updateAndSave} resetData={resetData} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== REUSABLE COMPONENTS ===== */
function Card({ title, children, className = '' }) {
  return (
    <div className={`bg-dark-100/50 border border-white/5 rounded-2xl p-6 ${className}`}>
      {title && <h3 className="text-lg font-display font-semibold text-white mb-5">{title}</h3>}
      {children}
    </div>
  );
}

function InputField({ label, value, onChange, type = 'text', placeholder = '', rows }) {
  const baseClass = "w-full px-4 py-2.5 bg-dark/50 border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 transition-all";

  return (
    <div>
      <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">{label}</label>
      {rows ? (
        <textarea value={value} onChange={onChange} rows={rows} className={`${baseClass} resize-none`} placeholder={placeholder} />
      ) : (
        <input type={type} value={value} onChange={onChange} className={baseClass} placeholder={placeholder} />
      )}
    </div>
  );
}

function SaveButton({ onClick, saving }) {
  return (
    <button onClick={onClick} disabled={saving}
      className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-500 hover:to-purple-500 text-white text-sm font-medium rounded-xl shadow-lg shadow-primary-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
      <HiSave size={16} /> {saving ? 'Saving...' : 'Save Changes'}
    </button>
  );
}

/* ===== PERSONAL TAB ===== */
function PersonalTab({ data, updateAndSave }) {
  const [form, setForm] = useState({ ...data.personal });
  const [socialForm, setSocialForm] = useState({ ...data.social });
  const [saving, setSaving] = useState(false);

  const savePersonal = async () => {
    setSaving(true);
    const res = await updateAndSave({ personal: { ...data.personal, ...form } });
    res?.ok ? toast.success('Personal info saved!') : toast.error(res?.error || 'Save failed');
    setSaving(false);
  };

  const saveSocial = async () => {
    setSaving(true);
    const res = await updateAndSave({ social: { ...data.social, ...socialForm } });
    res?.ok ? toast.success('Social links saved!') : toast.error(res?.error || 'Save failed');
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <Card title="Personal Information">
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <InputField label="Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <InputField label="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          <InputField label="Subtitle" value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })} />
          <InputField label="Email" value={form.email} type="email" onChange={e => setForm({ ...form, email: e.target.value })} />
          <InputField label="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+880..." />
          <InputField label="Location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
          <InputField label="University" value={form.university} onChange={e => setForm({ ...form, university: e.target.value })} />
          <InputField label="Department" value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} />
          <div className="sm:col-span-2">
            <InputField label="Avatar URL" value={form.avatar} onChange={e => setForm({ ...form, avatar: e.target.value })} placeholder="https://..." />
          </div>
          <div className="sm:col-span-2">
            <InputField label="Resume Link" value={form.resume} onChange={e => setForm({ ...form, resume: e.target.value })} placeholder="https://drive.google.com/..." />
          </div>
        </div>
        <SaveButton onClick={savePersonal} saving={saving} />
      </Card>

      <Card title="Social Links">
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <InputField label="GitHub" value={socialForm.github} onChange={e => setSocialForm({ ...socialForm, github: e.target.value })} />
          <InputField label="LinkedIn" value={socialForm.linkedin} onChange={e => setSocialForm({ ...socialForm, linkedin: e.target.value })} />
          <InputField label="Facebook" value={socialForm.facebook} onChange={e => setSocialForm({ ...socialForm, facebook: e.target.value })} />
          <InputField label="Instagram" value={socialForm.instagram} onChange={e => setSocialForm({ ...socialForm, instagram: e.target.value })} />
          <InputField label="Twitter / X" value={socialForm.twitter} onChange={e => setSocialForm({ ...socialForm, twitter: e.target.value })} />
          <InputField label="Website" value={socialForm.website} onChange={e => setSocialForm({ ...socialForm, website: e.target.value })} />
        </div>
        <SaveButton onClick={saveSocial} saving={saving} />
      </Card>
    </div>
  );
}

/* ===== ABOUT TAB ===== */
function AboutTab({ data, updateAndSave }) {
  const [desc, setDesc] = useState(data.about.description);
  const [highlights, setHighlights] = useState([...data.about.highlights]);
  const [stats, setStats] = useState([...data.about.stats]);
  const [services, setServices] = useState([...data.services]);
  const [saving, setSaving] = useState(false);

  const saveAbout = async () => {
    setSaving(true);
    const res = await updateAndSave({ about: { ...data.about, description: desc, highlights, stats } });
    res?.ok ? toast.success('About section saved!') : toast.error(res?.error || 'Save failed');
    setSaving(false);
  };

  const saveServices = async () => {
    setSaving(true);
    const res = await updateAndSave({ services });
    res?.ok ? toast.success('Services saved!') : toast.error(res?.error || 'Save failed');
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <Card title="About Me">
        <div className="space-y-4 mb-6">
          <InputField label="Description" value={desc} onChange={e => setDesc(e.target.value)} rows={4} />

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Highlights</label>
            {highlights.map((h, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  value={h}
                  onChange={e => { const n = [...highlights]; n[i] = e.target.value; setHighlights(n); }}
                  className="flex-1 px-4 py-2 bg-dark/50 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-primary-500/50 transition-all"
                />
                <button onClick={() => setHighlights(highlights.filter((_, j) => j !== i))} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                  <HiTrash size={16} />
                </button>
              </div>
            ))}
            <button onClick={() => setHighlights([...highlights, ''])} className="flex items-center gap-1 text-sm text-primary-400 hover:text-primary-300 mt-2">
              <HiPlus size={16} /> Add Highlight
            </button>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Stats</label>
            {stats.map((s, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input value={s.label} onChange={e => { const n = [...stats]; n[i] = { ...n[i], label: e.target.value }; setStats(n); }}
                  className="flex-1 px-3 py-2 bg-dark/50 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-primary-500/50 transition-all" placeholder="Label" />
                <input value={s.value} onChange={e => { const n = [...stats]; n[i] = { ...n[i], value: e.target.value }; setStats(n); }}
                  className="w-24 px-3 py-2 bg-dark/50 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-primary-500/50 transition-all" placeholder="Value" />
                <button onClick={() => setStats(stats.filter((_, j) => j !== i))} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                  <HiTrash size={16} />
                </button>
              </div>
            ))}
            <button onClick={() => setStats([...stats, { label: '', value: '' }])} className="flex items-center gap-1 text-sm text-primary-400 hover:text-primary-300 mt-2">
              <HiPlus size={16} /> Add Stat
            </button>
          </div>
        </div>
        <SaveButton onClick={saveAbout} saving={saving} />
      </Card>

      <Card title="Services">
        <div className="space-y-4 mb-6">
          {services.map((svc, i) => (
            <div key={i} className="p-4 bg-dark/30 border border-white/5 rounded-xl space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Service #{i + 1}</span>
                <button onClick={() => setServices(services.filter((_, j) => j !== i))} className="p-1 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                  <HiTrash size={14} />
                </button>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <input value={svc.title} onChange={e => { const n = [...services]; n[i] = { ...n[i], title: e.target.value }; setServices(n); }}
                  className="px-3 py-2 bg-dark/50 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-primary-500/50 transition-all" placeholder="Title" />
                <select value={svc.icon} onChange={e => { const n = [...services]; n[i] = { ...n[i], icon: e.target.value }; setServices(n); }}
                  className="px-3 py-2 bg-dark/50 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-primary-500/50 transition-all">
                  <option value="web">Web</option>
                  <option value="mobile">Mobile</option>
                  <option value="backend">Backend</option>
                  <option value="design">Design</option>
                </select>
              </div>
              <textarea value={svc.description} onChange={e => { const n = [...services]; n[i] = { ...n[i], description: e.target.value }; setServices(n); }}
                rows={2} className="w-full px-3 py-2 bg-dark/50 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-primary-500/50 transition-all resize-none" placeholder="Description" />
            </div>
          ))}
          <button onClick={() => setServices([...services, { id: Date.now(), title: '', description: '', icon: 'web' }])}
            className="flex items-center gap-1 text-sm text-primary-400 hover:text-primary-300">
            <HiPlus size={16} /> Add Service
          </button>
        </div>
        <SaveButton onClick={saveServices} saving={saving} />
      </Card>
    </div>
  );
}

/* ===== SKILLS TAB ===== */
const EMOJI_OPTIONS = ['⚡', '🚀', '🛠️', '🔬', '📊', '🎯', '💻', '🌐', '📱', '🧠', '🎨', '📚', '🔧', '⚙️', '🏗️', '🧪'];

function SkillsTab({ data, updateAndSave }) {
  const [skills, setSkills] = useState(JSON.parse(JSON.stringify(data.skills)));
  const [saving, setSaving] = useState(false);
  const [emojiPicker, setEmojiPicker] = useState(null); // index of category showing picker

  const save = async () => {
    setSaving(true);
    const res = await updateAndSave({ skills });
    res?.ok ? toast.success('Skills saved!') : toast.error(res?.error || 'Save failed');
    setSaving(false);
  };

  const addCategory = () => {
    setSkills([...skills, { category: 'New Category', icon: '🎯', items: [] }]);
  };

  const removeCategory = (i) => {
    setSkills(skills.filter((_, j) => j !== i));
    if (emojiPicker === i) setEmojiPicker(null);
  };

  const moveCategory = (from, dir) => {
    const to = from + dir;
    if (to < 0 || to >= skills.length) return;
    const n = [...skills];
    [n[from], n[to]] = [n[to], n[from]];
    setSkills(n);
    if (emojiPicker === from) setEmojiPicker(to);
    else if (emojiPicker === to) setEmojiPicker(from);
  };

  const setIcon = (catIndex, icon) => {
    const n = [...skills];
    n[catIndex] = { ...n[catIndex], icon };
    setSkills(n);
    setEmojiPicker(null);
  };

  const addSkill = (catIndex) => {
    const n = [...skills];
    n[catIndex] = { ...n[catIndex], items: [...n[catIndex].items, { name: '', level: 50 }] };
    setSkills(n);
  };

  const removeSkill = (catIndex, skillIndex) => {
    const n = [...skills];
    n[catIndex] = { ...n[catIndex], items: n[catIndex].items.filter((_, j) => j !== skillIndex) };
    setSkills(n);
  };

  return (
    <div className="space-y-6">
      {skills.map((cat, catIndex) => (
        <Card key={catIndex}>
          <div className="flex items-center gap-3 mb-5">
            {/* Reorder buttons */}
            <div className="flex flex-col -space-y-0.5">
              <button
                onClick={() => moveCategory(catIndex, -1)}
                disabled={catIndex === 0}
                className="p-1 text-gray-500 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed rounded transition-colors"
                title="Move up"
              >
                <HiChevronUp size={16} />
              </button>
              <button
                onClick={() => moveCategory(catIndex, 1)}
                disabled={catIndex === skills.length - 1}
                className="p-1 text-gray-500 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed rounded transition-colors"
                title="Move down"
              >
                <HiChevronDown size={16} />
              </button>
            </div>

            {/* Emoji icon button */}
            <div className="relative">
              <button
                onClick={() => setEmojiPicker(emojiPicker === catIndex ? null : catIndex)}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-lg transition-all"
                title="Change icon"
              >
                {cat.icon || '⚡'}
              </button>
              <AnimatePresence>
                {emojiPicker === catIndex && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: -4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute top-12 left-0 z-20 p-2 bg-dark-800 border border-white/10 rounded-xl shadow-xl grid grid-cols-4 gap-1 min-w-[160px]"
                  >
                    {EMOJI_OPTIONS.map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => setIcon(catIndex, emoji)}
                        className={`w-9 h-9 flex items-center justify-center rounded-lg text-lg hover:bg-white/10 transition-colors ${cat.icon === emoji ? 'bg-primary-500/20 ring-1 ring-primary-500/40' : ''}`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Category name */}
            <input
              value={cat.category}
              onChange={e => { const n = [...skills]; n[catIndex] = { ...n[catIndex], category: e.target.value }; setSkills(n); }}
              className="flex-1 text-lg font-display font-semibold bg-transparent text-white border-b border-transparent hover:border-white/20 focus:border-primary-500/50 focus:outline-none transition-all px-1 py-0.5"
              placeholder="Category name"
            />

            {/* Count badge + delete */}
            <span className="text-xs text-gray-500 font-mono px-2 py-1 bg-white/5 rounded-lg">{cat.items.length} skills</span>
            <button onClick={() => removeCategory(catIndex)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
              <HiTrash size={16} />
            </button>
          </div>

          <div className="space-y-2.5 mb-4">
            {cat.items.map((skill, si) => (
              <div key={si} className="flex items-center gap-3 group">
                <span className="text-xs text-gray-600 font-mono w-5 text-right">{si + 1}</span>
                <input
                  value={skill.name}
                  onChange={e => { const n = JSON.parse(JSON.stringify(skills)); n[catIndex].items[si].name = e.target.value; setSkills(n); }}
                  className="flex-1 px-3 py-2 bg-dark/50 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-primary-500/50 transition-all"
                  placeholder="Skill name"
                />
                <button onClick={() => removeSkill(catIndex, si)} className="p-1.5 text-red-400/50 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                  <HiTrash size={14} />
                </button>
              </div>
            ))}
          </div>
          <button onClick={() => addSkill(catIndex)} className="flex items-center gap-1 text-sm text-primary-400 hover:text-primary-300 transition-colors">
            <HiPlus size={16} /> Add Skill
          </button>
        </Card>
      ))}

      <div className="flex items-center gap-4">
        <button onClick={addCategory} className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-all">
          <HiPlus size={16} /> Add Category
        </button>
        <SaveButton onClick={save} saving={saving} />
      </div>
    </div>
  );
}

/* ===== PROJECTS TAB ===== */
function ProjectsTab({ data, updateAndSave }) {
  const [projects, setProjects] = useState(JSON.parse(JSON.stringify(data.projects)));
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    const res = await updateAndSave({ projects });
    res?.ok ? toast.success('Projects saved!') : toast.error(res?.error || 'Save failed');
    setSaving(false);
  };

  const addProject = () => {
    setProjects([...projects, {
      id: Date.now(),
      title: '',
      description: '',
      image: '',
      tags: [],
      github: '',
      live: '',
      featured: false
    }]);
  };

  const removeProject = (i) => {
    setProjects(projects.filter((_, j) => j !== i));
  };

  const updateProject = (i, field, value) => {
    const n = [...projects];
    n[i] = { ...n[i], [field]: value };
    setProjects(n);
  };

  return (
    <div className="space-y-6">
      {projects.map((project, i) => (
        <Card key={project.id}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-gray-500">Project #{i + 1}</span>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
                <input type="checkbox" checked={project.featured} onChange={e => updateProject(i, 'featured', e.target.checked)}
                  className="rounded border-gray-600 text-primary-500 focus:ring-primary-500/20" />
                Featured
              </label>
              <button onClick={() => removeProject(i)} className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                <HiTrash size={16} />
              </button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <InputField label="Title" value={project.title} onChange={e => updateProject(i, 'title', e.target.value)} />
            <InputField label="Image URL" value={project.image} onChange={e => updateProject(i, 'image', e.target.value)} placeholder="https://..." />
            <InputField label="GitHub URL" value={project.github} onChange={e => updateProject(i, 'github', e.target.value)} />
            <InputField label="Live Demo URL" value={project.live} onChange={e => updateProject(i, 'live', e.target.value)} />
            <div className="sm:col-span-2">
              <InputField label="Description" value={project.description} onChange={e => updateProject(i, 'description', e.target.value)} rows={2} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Tags (comma-separated)</label>
              <input
                value={project.tags.join(', ')}
                onChange={e => updateProject(i, 'tags', e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
                className="w-full px-4 py-2.5 bg-dark/50 border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 transition-all"
                placeholder="React, Node.js, MongoDB"
              />
            </div>
          </div>
        </Card>
      ))}

      <div className="flex items-center gap-4">
        <button onClick={addProject} className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-all">
          <HiPlus size={16} /> Add Project
        </button>
        <SaveButton onClick={save} saving={saving} />
      </div>
    </div>
  );
}

/* ===== EDUCATION TAB ===== */
function EducationTab({ data, updateAndSave }) {
  const [education, setEducation] = useState(JSON.parse(JSON.stringify(data.education)));
  const [experience, setExperience] = useState(JSON.parse(JSON.stringify(data.experience)));
  const [saving, setSaving] = useState(false);

  const saveEducation = async () => {
    setSaving(true);
    const res = await updateAndSave({ education });
    res?.ok ? toast.success('Education saved!') : toast.error(res?.error || 'Save failed');
    setSaving(false);
  };

  const saveExperience = async () => {
    setSaving(true);
    const res = await updateAndSave({ experience });
    res?.ok ? toast.success('Experience saved!') : toast.error(res?.error || 'Save failed');
    setSaving(false);
  };

  const addEdu = () => setEducation([...education, { id: Date.now(), degree: '', institution: '', duration: '', description: '', achievements: [] }]);
  const addExp = () => setExperience([...experience, { id: Date.now(), role: '', company: '', duration: '', description: '', responsibilities: [] }]);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-display font-semibold text-white flex items-center gap-2"><HiAcademicCap size={20} /> Education</h3>
      {education.map((edu, i) => (
        <Card key={edu.id}>
          <div className="flex justify-between mb-3">
            <span className="text-xs text-gray-500">Education #{i + 1}</span>
            <button onClick={() => setEducation(education.filter((_, j) => j !== i))} className="p-1 text-red-400 hover:bg-red-500/10 rounded-lg"><HiTrash size={14} /></button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <InputField label="Degree" value={edu.degree} onChange={e => { const n = [...education]; n[i] = { ...n[i], degree: e.target.value }; setEducation(n); }} />
            <InputField label="Institution" value={edu.institution} onChange={e => { const n = [...education]; n[i] = { ...n[i], institution: e.target.value }; setEducation(n); }} />
            <InputField label="Duration" value={edu.duration} onChange={e => { const n = [...education]; n[i] = { ...n[i], duration: e.target.value }; setEducation(n); }} placeholder="2022 - Present" />
            <InputField label="Description" value={edu.description} onChange={e => { const n = [...education]; n[i] = { ...n[i], description: e.target.value }; setEducation(n); }} />
          </div>
          <div className="mt-3">
            <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Achievements</label>
            {edu.achievements.map((ach, j) => (
              <div key={j} className="flex gap-2 mb-2">
                <input value={ach} onChange={e => { const n = JSON.parse(JSON.stringify(education)); n[i].achievements[j] = e.target.value; setEducation(n); }}
                  className="flex-1 px-3 py-2 bg-dark/50 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-primary-500/50 transition-all" />
                <button onClick={() => { const n = JSON.parse(JSON.stringify(education)); n[i].achievements.splice(j, 1); setEducation(n); }}
                  className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg"><HiTrash size={14} /></button>
              </div>
            ))}
            <button onClick={() => { const n = JSON.parse(JSON.stringify(education)); n[i].achievements.push(''); setEducation(n); }}
              className="flex items-center gap-1 text-sm text-primary-400 hover:text-primary-300 mt-1"><HiPlus size={14} /> Add Achievement</button>
          </div>
        </Card>
      ))}
      <div className="flex items-center gap-4">
        <button onClick={addEdu} className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-all">
          <HiPlus size={16} /> Add Education
        </button>
        <SaveButton onClick={saveEducation} saving={saving} />
      </div>

      <div className="border-t border-white/5 pt-6 mt-6" />

      <h3 className="text-lg font-display font-semibold text-white flex items-center gap-2">💼 Experience</h3>
      {experience.map((exp, i) => (
        <Card key={exp.id}>
          <div className="flex justify-between mb-3">
            <span className="text-xs text-gray-500">Experience #{i + 1}</span>
            <button onClick={() => setExperience(experience.filter((_, j) => j !== i))} className="p-1 text-red-400 hover:bg-red-500/10 rounded-lg"><HiTrash size={14} /></button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <InputField label="Role" value={exp.role} onChange={e => { const n = [...experience]; n[i] = { ...n[i], role: e.target.value }; setExperience(n); }} />
            <InputField label="Company" value={exp.company} onChange={e => { const n = [...experience]; n[i] = { ...n[i], company: e.target.value }; setExperience(n); }} />
            <InputField label="Duration" value={exp.duration} onChange={e => { const n = [...experience]; n[i] = { ...n[i], duration: e.target.value }; setExperience(n); }} />
            <InputField label="Description" value={exp.description} onChange={e => { const n = [...experience]; n[i] = { ...n[i], description: e.target.value }; setExperience(n); }} />
          </div>
          <div className="mt-3">
            <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Responsibilities</label>
            {exp.responsibilities.map((resp, j) => (
              <div key={j} className="flex gap-2 mb-2">
                <input value={resp} onChange={e => { const n = JSON.parse(JSON.stringify(experience)); n[i].responsibilities[j] = e.target.value; setExperience(n); }}
                  className="flex-1 px-3 py-2 bg-dark/50 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-primary-500/50 transition-all" />
                <button onClick={() => { const n = JSON.parse(JSON.stringify(experience)); n[i].responsibilities.splice(j, 1); setExperience(n); }}
                  className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg"><HiTrash size={14} /></button>
              </div>
            ))}
            <button onClick={() => { const n = JSON.parse(JSON.stringify(experience)); n[i].responsibilities.push(''); setExperience(n); }}
              className="flex items-center gap-1 text-sm text-primary-400 hover:text-primary-300 mt-1"><HiPlus size={14} /> Add Responsibility</button>
          </div>
        </Card>
      ))}
      <div className="flex items-center gap-4">
        <button onClick={addExp} className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-all">
          <HiPlus size={16} /> Add Experience
        </button>
        <SaveButton onClick={saveExperience} saving={saving} />
      </div>
    </div>
  );
}

/* ===== SETTINGS TAB ===== */
function SettingsTab({ data, updateAndSave, resetData }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [web3formsKey, setWeb3formsKey] = useState(data.web3formsKey || '');
  const [saving, setSaving] = useState(false);

  const changePassword = async () => {
    if (!newPassword) { toast.error('Enter a new password'); return; }
    if (newPassword !== confirmPassword) { toast.error('Passwords do not match'); return; }
    if (newPassword.length < 4) { toast.error('Password too short (min 4 chars)'); return; }
    setSaving(true);
    const res = await updateAndSave({ adminPassword: newPassword });
    res?.ok ? toast.success('Password changed!') : toast.error(res?.error || 'Save failed');
    setSaving(false);
    setNewPassword('');
    setConfirmPassword('');
  };

  const saveWeb3FormsKey = async () => {
    setSaving(true);
    const res = await updateAndSave({ web3formsKey: web3formsKey.trim() });
    res?.ok ? toast.success('Web3Forms key saved!') : toast.error(res?.error || 'Save failed');
    setSaving(false);
  };

  const handleReset = async () => {
    if (window.confirm('This will reset ALL portfolio data to defaults. Are you sure?')) {
      const ok = await resetData();
      ok ? toast.success('Data reset to defaults!') : toast.error('Failed to reset');
    }
  };

  const exportData = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio-data.json';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Data exported!');
  };

  const importData = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      try {
        const imported = JSON.parse(ev.target.result);
        setSaving(true);
        const ok = await updateAndSave(imported);
        ok ? toast.success('Data imported & saved!') : toast.error('Import failed');
        setSaving(false);
      } catch {
        toast.error('Invalid JSON file!');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      <Card title="Change Admin Password">
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <InputField label="New Password" value={newPassword} type="password" onChange={e => setNewPassword(e.target.value)} />
          <InputField label="Confirm Password" value={confirmPassword} type="password" onChange={e => setConfirmPassword(e.target.value)} />
        </div>
        <SaveButton onClick={changePassword} saving={saving} />
      </Card>

      <Card title="Contact Form (Web3Forms)">
        <p className="text-sm text-gray-400 mb-4">
          Get a free access key from{' '}
          <a href="https://web3forms.com" target="_blank" rel="noreferrer" className="text-primary-400 hover:underline">web3forms.com</a>{' '}
          — enter your email there, and paste the key below. Messages from the contact form will be sent directly to your email.
        </p>
        <div className="mb-4">
          <InputField label="Web3Forms Access Key" value={web3formsKey} placeholder="e.g. xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" onChange={e => setWeb3formsKey(e.target.value)} />
        </div>
        <SaveButton onClick={saveWeb3FormsKey} saving={saving} />
      </Card>

      <Card title="Data Management">
        <div className="flex flex-wrap gap-4">
          <button onClick={exportData}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600/20 border border-emerald-500/30 rounded-xl text-sm text-emerald-300 hover:bg-emerald-600/30 transition-all">
            <HiSave size={16} /> Export Data
          </button>

          <label className="flex items-center gap-2 px-5 py-2.5 bg-blue-600/20 border border-blue-500/30 rounded-xl text-sm text-blue-300 hover:bg-blue-600/30 transition-all cursor-pointer">
            <HiRefresh size={16} /> Import Data
            <input type="file" accept=".json" onChange={importData} className="hidden" />
          </label>

          <button onClick={handleReset}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-600/20 border border-red-500/30 rounded-xl text-sm text-red-300 hover:bg-red-600/30 transition-all">
            <HiTrash size={16} /> Reset All Data
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-4">Export your data as a JSON file for backup. Import to restore your portfolio content.</p>
      </Card>
    </div>
  );
}
