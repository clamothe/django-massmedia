# Valid media extensions, edit at your own risk
IMAGE_EXTS = ('bmp','gif','ico','cur','jpg','jpeg','pcx','png','psd','tga','tiff','wmf','xcf','bmp','wmf','apm','emf')
VIDEO_EXTS = ('asf','wmv','flv','mov','mpeg','mpg','mpe','vob','qt','mp4','m4v','rm','avi','ogm')
AUDIO_EXTS = ('asf','aif','aiff','aifc','flac','au','snd','mid','midi','mpa','m4a','mp1','mp2','mp3','ra','xm','wav','ogg')
FLASH_EXTS = ('swf',)

# Information quality for parsing metadata (0.0=fastest, 1.0=best, and default is 0.5)
INFO_QUALITY = 1.0

# Size of thumbnail to take
THUMB_SIZE = (100,80)

# Extra mime types to monkey patch to mimetypes.types_map
EXTRA_MIME_TYPES = {
    '.flv':'video/x-flv',
}