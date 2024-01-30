using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ActivityClubPortal.Core.Repository.Models;
using ActivityClubPortal.Services.Resources;
using AutoMapper;
using ClassLibrary2.Services.Resources;

namespace ClassLibrary2.Services.Mapping
{
    public class MappingProfile : Profile

    {
        public MappingProfile()
        {
            CreateMap<UserRole, UserRoleResource>();
            CreateMap<UserRoleResource,UserRole>();

            CreateMap<Event,EventGuideResource>();
            CreateMap<EventGuideResource, Event>();
            CreateMap<Guide, EventGuideResource>();
            CreateMap<EventGuideResource, Guide>();

            CreateMap<Event,EventMemberResource>();
            CreateMap<EventMemberResource, Event>();
            CreateMap<Member, EventMemberResource>();
            CreateMap<EventMemberResource, Member>();
            CreateMap<Lookup, EventResource>();
            CreateMap<EventResource, Lookup>();

            CreateMap<EventResource, Event>();
            CreateMap<Event, EventResource>();

            CreateMap<EventGuideResource, EventGuide>();
            CreateMap<EventGuide, EventGuideResource>();
            CreateMap<EventGuideResource, Guide>();
            CreateMap<Guide, EventGuideResource>();

            CreateMap<EventMemberResource, EventMember>();
            CreateMap<EventMemberResource, Member>();

            CreateMap<MemberResource, Member>();
            CreateMap<Member, MemberResource>();

            CreateMap<GuideResource, Guide>();
            CreateMap<Guide, GuideResource>();

        }
    }
}
