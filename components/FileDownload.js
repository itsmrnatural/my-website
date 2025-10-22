/**
 * FileDownload widget component for blog posts
 * Allows users to download files shared in blog posts
 * @param {Object} props - Component props
 * @param {string} props.fileName - Name of the file
 * @param {string} props.fileUrl - URL to download the file
 * @param {string} props.fileSize - Size of the file (e.g., "2.4 MB")
 * @param {string} props.description - Optional description of the file
 * @returns {JSX.Element} File download widget
 */
export default function FileDownload({ fileName, fileUrl, fileSize, description }) {
  return (
    <div className="my-6 p-4 bg-coffee-100 dark:bg-white/5 border-2 border-coffee-300 dark:border-white/10 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <i className="fas fa-file-download text-2xl text-coffee-600 dark:text-coffee-300" />
            <div>
              <h4 className="font-semibold text-coffee-900 dark:text-white">{fileName}</h4>
              {fileSize && (
                <span className="text-sm text-coffee-600 dark:text-white/60">{fileSize}</span>
              )}
            </div>
          </div>
          {description && (
            <p className="text-sm text-coffee-700 dark:text-white/70 ml-11">{description}</p>
          )}
        </div>
        <a
          href={fileUrl}
          download
          className="ml-4 px-4 py-2 bg-coffee-500 hover:bg-coffee-600 text-white font-medium rounded-lg transition-colors duration-200"
        >
          Download
        </a>
      </div>
    </div>
  );
}
