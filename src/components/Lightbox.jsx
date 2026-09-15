import { useEffect, useRef, useState } from 'react'

export default function Lightbox({ project, onClose }) {
  const dialogRef = useRef(null)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (project) {
      setIndex(0)
      if (!dialog.open) dialog.showModal()
    } else if (dialog.open) {
      dialog.close()
    }
  }, [project])

  const images = project?.images ?? []
  const count = images.length
  const go = (step) => setIndex((i) => (i + step + count) % count)

  const onKeyDown = (e) => {
    if (count < 2) return
    if (e.key === 'ArrowRight') go(1)
    if (e.key === 'ArrowLeft') go(-1)
  }

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      onClose={onClose}
      onKeyDown={onKeyDown}
      onClick={(e) => {
        if (e.target === dialogRef.current) dialogRef.current.close()
      }}
      aria-labelledby="lightbox-title"
    >
      {project && (
        <div className="lightbox-inner">
          <div className={`lightbox-stage${project.pixel ? ' is-pixel' : ''}`}>
            <img src={images[index].src} alt={images[index].alt} />
          </div>
          <div className="lightbox-meta">
            <div>
              <h3 id="lightbox-title">{project.title}</h3>
              <p className="engine">{project.engine}</p>
            </div>
            <p>{project.summary}</p>
            {project.details?.length > 0 && (
              <ul>
                {project.details.map((d) => <li key={d}>{d}</li>)}
              </ul>
            )}
            {project.playUrl && (
              <a className="text-link" href={project.playUrl} target="_blank" rel="noreferrer">
                Play on itch.io
              </a>
            )}
            <div className="lightbox-actions">
              {count > 1 && (
                <>
                  <button type="button" onClick={() => go(-1)}>Previous</button>
                  <span className="lightbox-count">{index + 1} of {count}</span>
                  <button type="button" onClick={() => go(1)}>Next</button>
                </>
              )}
              <button type="button" className="lightbox-close" onClick={() => dialogRef.current.close()}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </dialog>
  )
}
