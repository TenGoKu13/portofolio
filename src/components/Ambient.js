// Fond décoratif : blobs de lumière ambiante + grille subtile + scanlines HUD.
export default function Ambient() {
  return (
    <>
      <div className="ambient" aria-hidden="true">
        <div className="grid-overlay" />
      </div>
      <div className="scanlines" aria-hidden="true" />
    </>
  );
}
