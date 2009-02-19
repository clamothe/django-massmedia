from massmedia.models import Collection, CollectionRelation, Image, Flash, Video, Audio
from massmedia.templatetags.media_widgets import show_media
from django.shortcuts import render_to_response, get_object_or_404
from django.conf import settings
from django.http import Http404, HttpResponse
from django.contrib.contenttypes.models import ContentType

# str -> Model
media_types = {
    'image': Image,
    'audio': Audio,
    'flash': Flash,
    'video': Video,
}

def widget(request, media_pk, media_type):
    try:
        model = media_types[media_type]
    except KeyError:
        return HttpResponse('%s not found' % media_type)
    
    try:
        return render_to_response('massmedia/inline.html', {
            'media': model.objects.get(pk=media_pk),
            'type': media_type
        })
    except model.DoesNotExist:
        return HttpResponse('%s #%s not found' % (media_type, media_pk))

def list_by_type(request, media_type):
    try:
        model = media_types[media_type]
    except KeyError:
        return HttpResponse('%s not found' % media_type)

    return render_to_response('massmedia/list.html', {
        'objects': model.objects.filter(
            public=True,
            sites__id__exact=settings.SITE_ID
        )
    })

def list_by_collection(request, pk):
    return render_to_response('massmedia/list.html', {
        'objects': [x.content_object for x in CollectionRelation.objects.filter(
            collection=get_object_or_404(Collection, pk=pk),
            collection__public=True,
            collection__sites__id__exact=settings.SITE_ID
        )]
    })

def list_by_collection_by_type(request, pk, media_type):
    return render_to_response('massmedia/list.html', {
        'objects': [x.content_object for x in CollectionRelation.objects.filter(
            collection=get_object_or_404(Collection, pk=pk),
            collection__public=True,
            collection__sites__id__exact=settings.SITE_ID,
            content_type=ContentType.objects.get(name=media_type),
        )]
    })
    
def list(request):
    return render_to_response('massmedia/list_types.html', {
        'collections':Collection.objects.filter(
            public=True,
            sites__id__exact=settings.SITE_ID
        )
    })