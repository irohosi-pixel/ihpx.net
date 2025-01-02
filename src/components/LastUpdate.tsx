export default function LastUpdate({ updDate }: { updDate: Date }) {
  const dateNow = new Date();
  const diffMSec = dateNow.getTime() - updDate.getTime();
  const diffYear = Math.floor(diffMSec / (365 * 24 * 60 * 60 * 1000));
  return (
    diffYear > 0 && (
      <div className="mt-2 p-2 border border-orange-400 bg-orange-200 rounded text-orange-950">
        最終更新日から{diffYear}年以上経過しています。
      </div>
    )
  );
}
