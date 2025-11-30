import React, { useEffect, useMemo, useRef, useState } from "react";
import fetchMockFacilities from "../services/mockFacilities";

const LOCAL_STORAGE_KEY = "facility_comments";
const BOOKINGS_STORAGE_KEY = "facility_bookings";

const Sports = ({ onReserveClick, isLoggedIn }) => {
  const [facilities, setFacilities] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentDraft, setCommentDraft] = useState("");
  const [shouldFocusComments, setShouldFocusComments] = useState(false);
  const commentSectionRef = useRef(null);
  const [commentsByFacility, setCommentsByFacility] = useState(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (err) {
      console.error("Yorumlar yüklenemedi", err);
      return {};
    }
  });
  const [bookings, setBookings] = useState(() => {
    try {
      const stored = localStorage.getItem(BOOKINGS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (err) {
      console.error("Rezervasyonlar yüklenemedi", err);
      return {};
    }
  });

  useEffect(() => {
    let active = true;

    const loadFacilities = async () => {
      const { data, error: fetchError } = await fetchMockFacilities();
      if (!active) return;

      if (fetchError) {
        setError("İşletmeler şu anda yüklenemiyor");
      } else {
        setFacilities(data || []);
        setError(null);
      }
      setLoading(false);
    };

    loadFacilities();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    setCommentsByFacility((prev) => {
      let changed = false;
      const next = { ...prev };
      facilities.forEach((facility) => {
        if (!next[facility.id]) {
          next[facility.id] = [];
          changed = true;
        }
      });
      return changed ? next : prev;
    });
  }, [facilities]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(commentsByFacility));
    } catch (err) {
      console.error("Yorum yüklemesi başarışız", err);
    }
  }, [commentsByFacility]);

  useEffect(() => {
    try {
      localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
    } catch (err) {
      console.error("Rezervasyon kaydı başarısız", err);
    }
  }, [bookings]);

  useEffect(() => {
    if (selected && shouldFocusComments) {
      setTimeout(() => {
        commentSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
      setShouldFocusComments(false);
    }
  }, [selected, shouldFocusComments]);

  const filteredFacilities = useMemo(() => {
    let result = facilities;
    if (selectedType) {
      result = result.filter((facility) => (facility.type || "").toLowerCase() === selectedType);
    }
    if (!search.trim()) return result;
    const term = search.toLowerCase();
    return result.filter((facility) =>
      `${facility.name} ${facility.type || ""}`.toLowerCase().includes(term)
    );
  }, [facilities, search, selectedType]);

  const buildSlots = (facility) => {
    if (Array.isArray(facility.slots) && facility.slots.length > 0) {
      return facility.slots.map((slot) => ({
        ...slot,
        isBooked: slot.isBooked || Boolean(bookings[facility.id]?.[slot.time]),
      }));
    }
    const match = (facility.hours || "").match(/(\d{2}:\d{2})\s*-\s*(\d{2}:\d{2})/);
    if (!match) return [];
    const [, startStr, endStr] = match;
    const toMinutes = (str) => {
      const [h, m] = str.split(":").map(Number);
      return h * 60 + m;
    };
    const start = toMinutes(startStr);
    const end = toMinutes(endStr);
    const slots = [];
    for (let t = start; t < end; t += 60) {
      const h = String(Math.floor(t / 60)).padStart(2, "0");
      const m = String(t % 60).padStart(2, "0");
      const nextH = String(Math.floor((t + 60) / 60)).padStart(2, "0");
      const nextM = String((t + 60) % 60).padStart(2, "0");
      const timeLabel = `${h}:${m} - ${nextH}:${nextM}`;
      slots.push({ time: timeLabel, isBooked: Boolean(bookings[facility.id]?.[timeLabel]) });
    }
    return slots;
  };

  const handleSlotClick = (facility, slot) => {
    if (slot.isBooked) return;
    const confirmed = window.confirm(`${slot.time} için randevu alacaksınız. Onaylıyor musunuz?`);
    if (!confirmed) return;
    setBookings((prev) => {
      const next = { ...prev };
      const current = next[facility.id] ? { ...next[facility.id] } : {};
      current[slot.time] = true;
      next[facility.id] = current;
      return next;
    });
    onReserveClick?.(facility, slot.time);
    setSelected(null);
  };

  const currentComments = selected ? commentsByFacility[selected.id] || [] : [];

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!selected || !commentDraft.trim()) return;

    if (!isLoggedIn) {
      alert("Yorum yapmak için lütfen giriş yapın.");
      return;
    }

    const newComment = {
      id: `${selected.id}-${Date.now()}`,
      body: commentDraft.trim(),
      createdAt: new Date().toISOString(),
    };

    setCommentsByFacility((prev) => ({
      ...prev,
      [selected.id]: [newComment, ...(prev[selected.id] || [])],
    }));
    setCommentDraft("");
  };

  const renderSlots = (facility, slots) => (
    <div className="slots-grid">
      {slots.map((slot) => (
        <button
          key={slot.time}
          type="button"
          disabled={slot.isBooked}
          className={`time-slot ${slot.isBooked ? "booked" : "available"}`}
          onClick={() => handleSlotClick(facility, slot)}
        >
          <span>{slot.time}</span>
          <span className="slot-status">{slot.isBooked ? "Dolu" : "Musait"}</span>
        </button>
      ))}
    </div>
  );

  const facilityTags = useMemo(() => {
    const set = new Set(["buz hokeyi", "buz pateni", "handball"]);
    facilities.forEach((f) => {
      if (f.type) set.add(f.type.toLowerCase());
    });
    return Array.from(set);
  }, [facilities]);

  return (
    <div className="facilities-container">
      <div className="facility-header" style={{ flexDirection: "column", alignItems: "flex-start", gap: 12, border: "none" }}>
        <div>
          <p className="muted" style={{ margin: 0 }}>Spor Tesisleri</p>
          <h2 style={{ margin: "6px 0 0" }}>Rezervasyon ve saatler</h2>
          <p className="muted" style={{ margin: "6px 0 0" }}>Müsait saatleri seçerek rezervasyon oluşturun.</p>
        </div>
        <div className="search-container" style={{ maxWidth: 720, width: "100%" }}>
          <input
            className="search-input"
            placeholder="Tesis ara veya filtrele"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, width: "100%", alignItems: "center" }}>
          <strong style={{ fontSize: 13 }}>Ture gore filtrele:</strong>
          {facilityTags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={`outline-btn ${selectedType === tag ? "is-active" : ""}`}
              onClick={() => setSelectedType((prev) => (prev === tag ? null : tag))}
            >
              {tag}
            </button>
          ))}
          {facilityTags.length > 0 ? (
            <button
              type="button"
              className="outline-btn"
              onClick={() => {
                setSelectedType(null);
                setSearch("");
              }}
            >
              Filtreyi temizle
            </button>
          ) : null}
        </div>
      </div>

      {loading ? (
        <p style={{ padding: "16px 4px" }}>Tesisler yukleniyor...</p>
      ) : error ? (
        <p style={{ padding: "16px 4px", color: "#b91c1c" }}>{error}</p>
      ) : filteredFacilities.length === 0 ? (
        <p style={{ padding: "16px 4px" }}>Eslesen tesis bulunamadi.</p>
      ) : (
        <div className="facilities-grid">
          {filteredFacilities.map((facility) => (
            <div className="facility-card" key={facility.id}>
              <div className="facility-image">
                {facility.image ? (
                  <img src={facility.image} alt={facility.name} />
                ) : (
                  <div style={{ padding: 16 }}>Gorsel bulunmuyor</div>
                )}
              </div>
              <div className="facility-info">
                <div className="facility-header">
                  <div>
                    <div className="facility-tag">{facility.type || "Tesis"}</div>
                    <h3>{facility.name}</h3>
                  </div>
                  <span className="hours-badge">{facility.hours || "08:00 - 23:00"}</span>
                </div>
                <p style={{ margin: "0 0 6px", color: "#4b5563" }}>
                  Antalya’daki spor alanları ve saha rezervasyonları.
                </p>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
                  <button type="button" className="outline-btn" onClick={() => setSelected(facility)}>
                    Saatleri Gor
                  </button>
                  <button
                    type="button"
                    className="outline-btn"
                    onClick={() => {
                      setSelected(facility);
                      setShouldFocusComments(true);
                    }}
                  >
                    Yorumlar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selected ? (
        <div className="facility-overlay" onClick={() => setSelected(null)}>
          <div className="facility-overlay__content" onClick={(e) => e.stopPropagation()}>
            <div className="overlay-left">
              <div className="overlay-image">
                {selected.image ? (
                  <img src={selected.image} alt={selected.name} />
                ) : null}
              </div>
              <div className="overlay-info">
                <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "space-between" }}>
                  <div>
                    <div className="facility-tag">{selected.type || "Tesis"}</div>
                    <h3 style={{ margin: "6px 0" }}>{selected.name}</h3>
                    <p className="muted" style={{ margin: 0 }}>{selected.hours || "08:00 - 23:00"}</p>
                  </div>
                  <button type="button" className="outline-btn" onClick={() => setSelected(null)}>
                    Kapat
                  </button>
                </div>
                <p style={{ margin: "0 0 8px", color: "#4b5563" }}>
                  Uygun saatlerden birini secerek hizlica rezervasyon yapabilirsiniz.
                </p>
                {renderSlots(selected, buildSlots(selected))}
              </div>
            </div>

            <div className="overlay-comments" ref={commentSectionRef}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p className="muted" style={{ margin: 0 }}>Yorumlar</p>
                  <h4 style={{ margin: "4px 0 0" }}>{currentComments.length || 0} yorum</h4>
                </div>
                {!isLoggedIn ? (
                  <span className="pill">Giris yaparak yorum yaz</span>
                ) : null}
              </div>

              <div className="comments-list">
                {currentComments.length === 0 ? (
                  <div className="comment-card">
                    <span className="muted">Bu tesis icin henuz yorum yok. Ilk yorumu siz yazin.</span>
                  </div>
                ) : (
                  currentComments.map((comment) => (
                    <div key={comment.id} className="comment-card">
                      <span className="comment-text">{comment.body}</span>
                      <span className="muted" style={{ fontSize: 12 }}>
                        {new Date(comment.createdAt).toLocaleString()}
                      </span>
                    </div>
                  ))
                )}
              </div>

              <form onSubmit={handleCommentSubmit}>
                <label className="muted" htmlFor="comment-box" style={{ display: "block", marginBottom: 6 }}>
                  Tesis hakkinda yorum yazin
                </label>
                <textarea
                  id="comment-box"
                  className="overlay-textarea"
                  placeholder={isLoggedIn ? "Deneyiminizi paylaşın..." : "Yorum yapmak için giriş yapın"}
                  value={commentDraft}
                  onChange={(e) => setCommentDraft(e.target.value)}
                  disabled={!isLoggedIn}
                />
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
                  <button
                    type="submit"
                    className="send-btn"
                    disabled={!isLoggedIn || !commentDraft.trim()}
                  >
                    Yorumu gonder
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Sports;
