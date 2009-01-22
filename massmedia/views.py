from massmedia.models import Collection,CollectionRelation,Image,Flash,Video,Audio
from django.shortcuts import render_to_response,get_object_or_404
from django.conf import settings
from django.http import Http404
from django.contrib.contenttypes.models import ContentType

def list_by_type(request,type):
    if type == 'image':  model = Image
    elif type == 'audio':  model = Audio
    elif type == 'flash':  model = Flash
    elif type == 'video':  model = Video
    else: raise Http404
    return render_to_response('massmedia/list.html',{
        'objects': model.objects.filter(
            public=True,
            sites__id__exact=settings.SITE_ID
        )
    })

def list_by_collection(request,id):
    return render_to_response('massmedia/list.html',{
        'objects': [x.content_object for x in CollectionRelation.objects.filter(
            collection=get_object_or_404(Collection, pk=id),
            collection__public=True,
            collection__sites__id__exact=settings.SITE_ID
        )]
    })

def list_by_collection_by_type(request,id,type):
    return render_to_response('massmedia/list.html',{
        'objects': [x.content_object for x in CollectionRelation.objects.filter(
            collection=get_object_or_404(Collection, pk=id),
            collection__public=True,
            collection__sites__id__exact=settings.SITE_ID,
            content_type=ContentType.objects.get(name=type),
        )]
    })
    
def list(request):
    return render_to_response('massmedia/list_types.html',{
        'collections':Collection.objects.filter(
            public=True,
            sites__id__exact=settings.SITE_ID
        )
    })