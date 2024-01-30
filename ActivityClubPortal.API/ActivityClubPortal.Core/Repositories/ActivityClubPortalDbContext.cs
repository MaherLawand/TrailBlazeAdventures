using System;
using System.Collections.Generic;
using ActivityClubPortal.Core.Repository.Models;
using Microsoft.EntityFrameworkCore;

namespace ActivityClubPortal.Core.Repository;

public partial class ActivityClubPortalDbContext : DbContext
{
    public ActivityClubPortalDbContext()
    {
    }

    public ActivityClubPortalDbContext(DbContextOptions<ActivityClubPortalDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Event> Events { get; set; }

    public virtual DbSet<EventGuide> EventGuides { get; set; }

    public virtual DbSet<EventMember> EventMembers { get; set; }

    public virtual DbSet<Guide> Guides { get; set; }

    public virtual DbSet<Lookup> Lookups { get; set; }

    public virtual DbSet<Member> Members { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserRole> UserRoles { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("Data Source=DESKTOP-KVDQNT1;Initial Catalog=ActivityClubPortal;Integrated Security=True;Trust Server Certificate=True");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Event>(entity =>
        {
            entity.HasKey(e => e.EventId).HasName("PK__Event__7944C87072B54219");

            entity.Property(e => e.EventId).ValueGeneratedNever();

            entity.HasOne(d => d.Category).WithMany(p => p.Events)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Event__CategoryI__7B5B524B");
        });

        modelBuilder.Entity<EventGuide>(entity =>
        {
            entity.HasKey(e => e.EventGuideId).HasName("PK__EventGui__6BD595D0A9A4E466");

            entity.Property(e => e.EventGuideId).ValueGeneratedOnAdd();

            entity.HasOne(d => d.Event).WithMany(p => p.EventGuides).HasConstraintName("FK__EventGuid__Event__0B91BA14");

            entity.HasOne(d => d.Guide).WithMany(p => p.EventGuides).HasConstraintName("FK__EventGuid__Guide__0C85DE4D");
        });

        modelBuilder.Entity<EventMember>(entity =>
        {
            entity.HasKey(e => e.EventMemberId).HasName("PK__EventMem__0C810331C9B6E853");

            entity.Property(e => e.EventMemberId).ValueGeneratedOnAdd();

            entity.HasOne(d => d.Event).WithMany(p => p.EventMembers).HasConstraintName("FK__EventMemb__Event__03F0984C");

            entity.HasOne(d => d.Member).WithMany(p => p.EventMembers).HasConstraintName("FK__EventMemb__Membe__04E4BC85");
        });

        modelBuilder.Entity<Guide>(entity =>
        {
            entity.HasKey(e => e.GuideId).HasName("PK__Guide__E77EE03EDC58383A");

            entity.Property(e => e.GuideId).ValueGeneratedNever();
        });

        modelBuilder.Entity<Lookup>(entity =>
        {
            entity.HasKey(e => e.LookupId).HasName("PK__Lookup__6D8B9C6B22DDD894");

            entity.Property(e => e.LookupId).ValueGeneratedNever();
        });

        modelBuilder.Entity<Member>(entity =>
        {
            entity.HasKey(e => e.MemberId).HasName("PK__Member__0CF04B3869C74CD9");

            entity.Property(e => e.MemberId).ValueGeneratedNever();
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__User__1788CCAC23F0886B");

            entity.Property(e => e.UserId).ValueGeneratedNever();
        });

        modelBuilder.Entity<UserRole>(entity =>
        {
            entity.HasKey(e => e.UserRoleId).HasName("PK__UserRole__3D978A559A4E6BE2");

            entity.Property(e => e.UserRoleId).ValueGeneratedNever();

            entity.HasOne(d => d.User).WithMany(p => p.UserRoles)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__UserRole__UserID__0F624AF8");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
